import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { AcordUploadDto } from '../data-transfer-objects/acord-upload.dto';
import { AcordUpload } from '../entities/acord-upload.entity';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/common/services/logger.service';

const apiKey: string = '04caf3bf869757f593a3df5baed126848c256e91ea2982d69857f32f6f3242dbfeb0dd07e02dcb8ca8d6a71be1e0ecca58b6b07dc161572f5eaa273ed6eeab86';

@Injectable()
export class AcordUploadService {

    environmentAPI: string = '';
    azureSubscriptionKey: string = '';

    constructor(private httpService: HttpService, private configService: ConfigService, private loggerService: LoggerService) {
        this.environmentAPI = this.configService.get<string>('accord.uploadfile.httpPath');
        this.azureSubscriptionKey = this.configService.get<string>('accord.uploadfile.azureSubscriptionKey');
    }

    /**
     *
     * @param acordUploadForm uploaded acord-form received from angular post api call
     * @returns Callback API call to get status, statusText and operationLocation
     * @memberof AcordUploadService
     */
    async sendAcordFormsToAzure(acordUploadForm: any): Promise<any> {
        const headersConfiguration = {
            headers: {
                'Ocp-Apim-Subscription-Key': this.azureSubscriptionKey
            }
        };
        try {
            return this.httpService.post(
                'https://rais-formrecognizer.cognitiveservices.azure.com/formrecognizer/documentModels/ACORD125.Ingestion.IncludingUIGenerated:analyze?api-version=2022-08-31',
                { urlSource: this.environmentAPI + acordUploadForm['filename'] },
                headersConfiguration
            ).pipe(
                map((response: any) => {
                    return {
                        status: response.status,
                        statusText: response.statusText,
                        operationLocation: response.headers['operation-location']
                    };
                })
            );
        }
        catch (error) {
            this.loggerService.error(AcordUploadService.name, error.message, error, null, null, 'sendAcordFormsToAzure');
            throw error;
        }
    }

    /**
     *
     * @param getResultsLocation operation-location received in success response from initial post call
     * @returns Callback API call to get form recognizer analyzed results
     * @memberof AcordUploadService
     */
    async getAcordFormsResultsFromAzure(getResultsLocation: string) {
        const headersConfiguration = {
            headers: {
                'Ocp-Apim-Subscription-Key': this.azureSubscriptionKey
            }
        };
        try {
            return await this.httpService.get(
                getResultsLocation,
                headersConfiguration
            ).pipe(
                map((response: any) => {
                    return {
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    }
                })
            );
        }
        catch (error) {
            this.loggerService.error(AcordUploadService.name, error.message, error, null, null, 'getAcordFormsResultsFromAzure');
            throw error;
        }
    }

    newSendSingleAcordForm(acordUploadDto: string) {
        const documentToSend = btoa(acordUploadDto);
        const requestConfig = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer ' + apiKey
            }
        };
        return this.httpService.post(
            'https://api.sensible.so/v0/extract/acord_forms/?environment=production',
            { document: documentToSend },
            requestConfig
        ).subscribe(response => {
            console.log(response); // response.data
        });
    }

    sendSingleAcordForm(acordUploadDto: string): Promise<AcordUpload> {
        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: 'https://api.sensible.so/v0/extract/acord_125_2014_12/?environment=production',
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + apiKey,
                        'content-type': 'application/pdf'
                    },
                    body: { document: acordUploadDto }
                },
                function (error: any, res: any, body: any) {
                    if (!error && res.statusCode === 200) {
                        resolve(res);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }

    async getSendAcordFormUrl(acordUploadDto: AcordUploadDto): Promise<AcordUpload> {
        return new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: 'https://api.sensible.so/v0/generate_upload_url?environment=production',
                    method: 'POST',
                    headers: { Bearer: apiKey },
                    body: JSON.stringify({ types: ['acord_forms'] })
                },
                function (error: any, res: any, body: any) {
                    if (!error && res.statusCode === 200) {

                        // this.sendAcordForm(res);
                        resolve(res);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }
    async sendAcordForm() {

    }
    async getAcordFormData() {

    }

}

