import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { MarketMatchProspectsDto } from "src/market-match-prospects/data-transfer-objects/market-match-prospects.dto";


@Injectable()
export class HubspotService {
    constructor(private configService: ConfigService, private httpService: HttpService,) { }

    public async sendDataToHubspot(data: MarketMatchProspectsDto) {
        const hubspotUrl = this.configService.get<string>('hubspot.api');
        let payload = JSON.stringify({
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "email",
                    "value": data.prospect_email
                },
                {
                    "objectTypeId": "0-1",
                    "name": "hs_persona",
                    "value": data.prospect_role
                },
                {
                    "objectTypeId": "0-1",
                    "name": "state",
                    "value": data.agency_state
                },
                {
                    "objectTypeId": "0-1",
                    "name": "premium_range",
                    "value": data.premium_range
                }
            ]
        });
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } as unknown as AxiosRequestHeaders
        };
        try {
            await this.httpService.post(`${hubspotUrl}`, payload, config).subscribe(res => {
                return res;
            })
        }
        catch (exception) {
            throw exception;
        }

    }
}
