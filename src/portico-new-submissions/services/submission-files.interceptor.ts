import { FilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

interface SubmissionFilesInterceptorOptions {
    fieldName: string;
    path?: string;
}

function SubmissionFilesInterceptor(options: SubmissionFilesInterceptorOptions): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        filesInterceptor: NestInterceptor;
        constructor(private configService: ConfigService) {
            const filesDestination = this.configService.get<string>('submission.uploadfile.diskPath');
            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination: (req, file, callback) => {
                        const queryParam = req.params.id;
                        const destination = queryParam ? `${filesDestination}${options.path}${queryParam}/` : `${filesDestination}${options.path}`;
                        fs.mkdir(destination, { recursive: true }, error => {
                            if (error) {
                                callback(error, null);
                            } else {
                                callback(null, destination);
                            }
                        });
                    },
                    filename: (req, file, callback) => {
                        const filenames = req.params.filenames.split('||');
                        if(filenames && filenames.length > 0) {
                            let filename;
                            filenames.forEach(item => {
                                if(item.indexOf(file.originalname) > -1) {
                                    filename = item;
                                }
                            });
                            callback(null, filename);
                        }
                    }
                })
            };
            this.filesInterceptor = new (FilesInterceptor(options.fieldName, null, multerOptions));
        }

        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.filesInterceptor.intercept(...args);
        }
    }
    return mixin(Interceptor);
}

export default SubmissionFilesInterceptor;
