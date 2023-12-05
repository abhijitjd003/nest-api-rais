import { Controller, Post, Body, Put, Get, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { Req, Request, UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AcordUploadDto } from '../data-transfer-objects/acord-upload.dto';
import { AcordUploadService } from '../services/acord-upload.service';
import { extname } from 'path';
import { ConfigService } from "@nestjs/config";
import LocalFilesInterceptor from '../services/localFiles.interceptor';
import { Blob } from 'buffer';

const changethisfilenamelater = "storedfilename" + (Math.random() * 20);

@ApiTags('Acord Upload')
@ApiBearerAuth()
@Controller('api/v1/acord-upload')
export class AcordUploadController {
    filehttpPath: string;
    constructor(private configService: ConfigService, private readonly acordUploadService: AcordUploadService) {
        this.filehttpPath = this.configService.get<string>('accord.uploadfile.httpPath');
    }

    @UseGuards(JwtAuthGuard)
    @Post('/send-forms')
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(LocalFilesInterceptor({ fieldName: 'file', path: '/' }))
    async save(@Req() request, @UploadedFile() file: Express.Multer.File): Promise<any> {
        const result = await this.acordUploadService.sendAcordFormsToAzure(file);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/get-form-data')
    @UseFilters(HttpExceptionFilter)
    async postAcordForms(@Request() request, @Body() body: any) {
        return await this.acordUploadService.getAcordFormsResultsFromAzure(body.location);
    }

}
