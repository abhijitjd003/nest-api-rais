import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Injectable, Logger, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Subscription, take } from 'rxjs';
import { LogApiTokenResponse, LogDto } from '../data-transfer-objects/log-dto';
import { LogLevel } from '../enumerated-types/log-level.enum';
import * as qs from 'querystring';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/portico-market-match/entities/user.entity';
import { Model } from 'mongoose';

/**
 * Scope Default mean singleton
 */
@Injectable({ scope: Scope.DEFAULT })
export class LoggerService {
    private static LogAccessToken = null;

    private tokenUrl = "token";
    private nestLogUrl = "api/v1/logging/nest";

    readonly logger = new Logger(LoggerService.name);
    private loggerMap = new Map<string, Logger>();
    loggingSubscription$: Subscription = new Subscription();

    currentEnv: string = process.env.MEMBERCENTRAL_ENV;

    @InjectModel(User.name) private readonly userModelRef: Model<UserDocument>;
    constructor(private httpService: HttpService, private configService: ConfigService) {
    }

    resetToken(): void {
        LoggerService.LogAccessToken = null;
    }

    setToken(accessToken) {
        LoggerService.LogAccessToken = accessToken;
    }

    getToken() {
        return LoggerService.LogAccessToken;
    }

    isTokenExpired(): boolean {
        if (
            LoggerService.LogAccessToken == null ||
            LoggerService.LogAccessToken == ''
        ) {
            return true;
        } else {
            return false;
        }
    }

    async generateToken(): Promise<string> {
        let url = this.configService.get<string>('log.api.url');
        let username = this.configService.get<string>('log.api.username');
        let password = this.configService.get<string>('log.api.password');
        let payload = { username, password, grant_type: 'password' };
        let data = qs.stringify(payload);


        const config: AxiosRequestConfig = {
            headers: { 'Content-Type': `application/x-www-form-urlencoded` } as unknown as AxiosRequestHeaders
        };

        return new Promise<string>((resolve, reject) => {
            this.httpService.post(`${url}/${this.tokenUrl}`, data, config).pipe(take(1)).subscribe((res: AxiosResponse<LogApiTokenResponse>) => {
                this.setToken(res.data.access_token);
                resolve(res.data.access_token);
            }, (err) => {
                reject(err);
            });
        });
    }

    private async logMessage(logLevel: LogLevel, callerName: string, message: string, email?: string, sessionid?: string, data?: any, functionName?: string) {
        const apiLoggingUrl = this.configService.get<string>('log.api.url');
        const logData = new LogDto();
        logData.Timestamp = new Date().toString();
        logData.logLevel = logLevel;
        logData.ApplicationName = 'MEMBERCENTRAL_NEST';
        logData.Message = message;
        logData.Additional = [];
        if (data) {
            logData.Additional = [JSON.stringify(data)];
        }
        logData.StackTrace = callerName + ' functionName: ' + functionName;
        logData.Environmentname = this.currentEnv;
        logData.Email = email;

        const existingUser = await this.userModelRef.findOne({ email }).exec();
        const user = JSON.stringify(existingUser);
        logData.UserAgency = JSON.stringify(JSON.parse(user).agency);
        logData.SessionId = sessionid;
        logData.FileName = callerName;
        const payload = JSON.stringify(logData);

        await this.callLogApi(`${apiLoggingUrl}/${this.nestLogUrl}`, payload, 1);
    }

    private async callLogApi(url: string, payload: any, retryCount: number) {
        let token = this.getToken();
        if (this.isTokenExpired()) {
            token = await this.generateToken();
        }
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } as unknown as AxiosRequestHeaders
        }
        return this.httpService.post(`${url}`, payload, config).pipe(take(1)).subscribe(res => {
            return res;
        }, async (err) => {
            if (err.response.statusText === 'Unauthorized' && retryCount === 1) {
                retryCount++;
                this.resetToken();
                await this.callLogApi(url, payload, retryCount);
            } else {
                throw new HttpException(
                    'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        });
    }

    consoleLog(logLevel: LogLevel, callerName, message, data?: any, exception?: any): void {
        if (!this.loggerMap.has(callerName)) {
            this.loggerMap.set(callerName, new Logger(callerName));
        }
        const localLogger = this.loggerMap.get(callerName);
        if (data || exception) {
            switch (logLevel) {
                case LogLevel.INFO:
                    localLogger.log(message, { ...data });
                    break;
                case LogLevel.WARN:
                    localLogger.warn(message, { ...data });
                    break;
                case LogLevel.TRACE:
                case LogLevel.DEBUG:
                    localLogger.debug(message, { ...data });
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    localLogger.error(message, { ...exception }, { ...data });
                    break;
            }
        }
        else {
            switch (logLevel) {
                case LogLevel.INFO:
                    localLogger.log(message);
                    break;
                case LogLevel.WARN:
                    localLogger.warn(message);
                    break;
                case LogLevel.TRACE:
                case LogLevel.DEBUG:
                    localLogger.debug(message);
                    break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                    localLogger.error(message);
                    break;
            }
        }
    }

    info(callerName: string, message: string, data?: any, email?: string, sessionid?: string) {
        this.consoleLog(LogLevel.INFO, callerName, message, data);
        this.logMessage(LogLevel.INFO, callerName, message, email, sessionid, data);
    }

    warn(callerName: string, message: string, data?: any, email?: string) {
        this.consoleLog(LogLevel.WARN, callerName, message, data);
        this.logMessage(LogLevel.WARN, callerName, message, email, data);
    }

    debug(callerName: string, message: string, data?: any, email?: string) {
        this.consoleLog(LogLevel.DEBUG, callerName, message, data);
        this.logMessage(LogLevel.DEBUG, callerName, message, email, data);
    }

    error(callerName: string, message: string, data?: any, email?: string, sessionid?: string, functionName?: string) {
        this.consoleLog(LogLevel.ERROR, callerName, message, data);
        this.logMessage(LogLevel.ERROR, callerName, message, email, sessionid, data, functionName);
    }

}
