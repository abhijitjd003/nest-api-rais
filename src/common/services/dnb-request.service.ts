import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'request';
import { LoggerService } from './logger.service';

const GET_DNB_TOKEN_URL = 'https://plus.dnb.com/v2/token';
const GET_DNB_MATCH_URL = 'https://plus.dnb.com/v1/match/cleanseMatch';
const GET_DNB_DATA_URL = 'https://plus.dnb.com/v1/data/duns';

@Injectable()
export class DnbRequestService {
    private static DnBAccessToken = null;

    constructor(private configService: ConfigService, private loggerService: LoggerService) { }

    resetToken(): void {
        DnbRequestService.DnBAccessToken = null;
    }

    setToken(accessToken) {
        DnbRequestService.DnBAccessToken = accessToken;
    }

    getToken() {
        return DnbRequestService.DnBAccessToken;
    }

    isTokenExpired(): boolean {
        if (
            DnbRequestService.DnBAccessToken == null ||
            DnbRequestService.DnBAccessToken == ''
        ) {
            return true;
        } else {
            return false;
        }
    }

    getDnBToken(url: string) {
        let key = this.configService.get<string>('dnb.key');
        let secret = this.configService.get<string>('dnb.secret');
        let data = { grant_type: 'client_credentials' };
        let postData = JSON.stringify(data);
        let keyAndToken = key + ':' + secret;
        let base64Secret = Buffer.from(keyAndToken).toString('base64');
        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url,
                    method: 'POST',
                    shouldKeepAlive: false,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Basic ' + base64Secret,
                    },
                    body: postData,
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

    getDnBMatches(url: string, searchString: string, token: string) {
        searchString = searchString.replace(/[^a-zA-Z0-9\.,\-&?= ]/g, '');
        let postData = JSON.stringify(searchString);
        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url + searchString,
                    method: 'GET',
                    shouldKeepAlive: false,
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                    body: postData,
                },
                function (error: { code: string, message: string, stack: string }, res, body) {
                    if (error) {
                        this.loggerService.error(DnbRequestService.name, error.message, error);
                        reject(error);
                    } else {
                        if (res.statusMessage === 'Unauthorized') {
                            this.loggerService.error(DnbRequestService.name, res.statusMessage, error);
                            reject(res.statusMessage);
                        } else if (res.statusCode === 500) {
                            this.loggerService.error(DnbRequestService.name, res.statusMessage, error);
                            reject(error);
                        } else {
                            resolve(JSON.parse(body));
                        }
                    }
                }
            );
        });
    }

    getDnBData(url: String, DnBNumber: String, token: String) {
        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url + '/' + DnBNumber + '?blockIDs=companyinfo_L2_v1',
                    method: 'GET',
                    shouldKeepAlive: false,
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        if (res.statusMessage === 'Unauthorized') {
                            reject(res.statusMessage);
                        } else {
                            reject(error);
                        }
                    }
                }
            );
        });
    }

    async getAccessToken() {
        return await this.getDnBToken(GET_DNB_TOKEN_URL);
    }

    async getSearchResults(searchString: string, token: string) {
        return await this.getDnBMatches(GET_DNB_MATCH_URL, searchString, token);
    }

    async getCompanyData(DnBNumber: string, token: string) {
        return await this.getDnBData(GET_DNB_DATA_URL, DnBNumber, token);
    }
}
