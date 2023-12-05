import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'request';
import { SubmissionForm } from '../entities/submission-form.entity';

@Injectable()
export class NewSubmissionUploadService {
    filehttpPath: string;
    baseUrl: string;

    constructor(
        private configService: ConfigService,
    ) {
        this.filehttpPath = this.configService.get<string>('submission.uploadfile.httpPath');
        this.baseUrl = this.configService.get<string>('submission.uploadfile.baseUrl');
    }

    uploadSubmissionDocs(files: any, submissionId: string) {
        let documents = [];
        if(files && files.length > 0) {
            files.forEach(file => {
                const document = {
                    fileName: file.filename,
                    filePath: `${this.filehttpPath}${submissionId}/${file.filename}`
                }
                documents.push(document);
            })
        }
        return documents;
    }

    async getNextAvailableSubmissionId(fullName: string, currentUser: string, userEmail: string) {
        const action = 'GetAgencyCustomerInfo';
        const url = `${this.baseUrl}${action}?fullName=${fullName}&currentUser=${currentUser}&userEmail=${userEmail}`;

        return await new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url,
                    method: 'GET',
                    shouldKeepAlive: false,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        this.loggerService.error(NewSubmissionUploadService.name, error.message, error);
                        reject(error);
                    }
                }
            );
        });
    }

    async processNewSubmissionWorkflowData(submissionForm: SubmissionForm) {
        const url = this.baseUrl + 'SubmissionNew';
        return await new Promise(function (resolve, reject) {
            let result = request(
                {
                    url: url,
                    method: 'POST',
                    shouldKeepAlive: false,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submissionForm),
                },
                function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                        resolve(JSON.parse(body));
                    } else {
                        this.loggerService.error(NewSubmissionUploadService.name, error.message, error);
                        reject(error);
                    }
                }
            );
        });
    }
}

