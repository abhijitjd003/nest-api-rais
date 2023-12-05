import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

interface LocalFilesInterceptorOptions {
    fieldName: string;
    path?: string;
}

function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;
        constructor(private configService: ConfigService) {
            const filesDestination = this.configService.get<string>('accord.uploadfile.diskPath');
            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination: (req, file, callback) => {
                        const destination = `${filesDestination}${options.path}`;
                        fs.mkdir(destination, { recursive: true }, error => {
                            if (error) {
                                callback(error, null);
                            } else {
                                callback(null, destination);
                            }
                        });
                    },
                    filename: (req, file, callback) => {
                        const name = file.originalname.split('.')[0];
                        const fileExtName = extname(file.originalname);
                        const randomName = Array(4)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        callback(null, `${name}-${randomName}${fileExtName}`);
                    }
                })
            };
            this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions));
        }

        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.fileInterceptor.intercept(...args);
        }
    }
    return mixin(Interceptor);
}

export default LocalFilesInterceptor;
