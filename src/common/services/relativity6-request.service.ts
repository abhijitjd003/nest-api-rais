import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'request';
import { Relativity6Entity } from 'src/portico-market-match/entities/relativity6.entity';
import { LoggerService } from './logger.service';

@Injectable()
export class Relativity6RequestService {

    constructor(private configService: ConfigService, private loggerService: LoggerService) { }

    searchRelativity6Data(relativity6Data: Relativity6Entity) {
        let url = this.configService.get<string>('relativity6.url');
        relativity6Data.token = this.configService.get<string>('relativity6.token');
        relativity6Data.predictionType = this.configService.get<string>('relativity6.prediction_type');

        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url,
                    method: 'POST',
                    shouldKeepAlive: false,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(relativity6Data),
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        this.loggerService.error(Relativity6RequestService.name, error.message, error);
                        reject(error);
                    }
                }
            );
        });
    }

    async getRelativity6Data(relativity6Data: Relativity6Entity) {
        return await this.searchRelativity6Data(relativity6Data);
    }
}
