import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsUploadService {
    filehttpPath: string;
    baseUrl: string;

    constructor(
        private configService: ConfigService,
    ) {
        this.filehttpPath = this.configService.get<string>('submission.uploadfile.httpPath');
        this.baseUrl = this.configService.get<string>('submission.uploadfile.baseUrl');
    }

    uploadMapsSubmissionDocs(files: any, submissionId: string) {
        let documents = [];
        if (files && files.length > 0) {
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
}

