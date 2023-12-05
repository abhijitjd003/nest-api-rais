import { Controller, Post, UseGuards, UseFilters, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Body, Get, Param, Query, Req, UploadedFile } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { NewSubmissionUploadService } from '../services/new-submission-upload.service';
import SubmissionFilesInterceptor from '../services/submission-files.interceptor';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { LoggerService } from 'src/common/services/logger.service';
import { SubmissionForm } from '../entities/submission-form.entity';

@ApiTags('New Submission Upload')
@ApiBearerAuth()
@Controller('api/v1/new-submission-upload')
export class NewSubmissionUploadController {

    constructor(
        private readonly newSubmissionUploadService: NewSubmissionUploadService,
        private errorhelperService: ErrorhelperService,
        private loggerService: LoggerService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/upload-docs/:id/:filenames')
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(SubmissionFilesInterceptor({ fieldName: 'files', path: '/' }))
    async save(@Req() request, @UploadedFile() files: Array<Express.Multer.File>, @Param('id') submissionId) {
        const uploadedFiles = request.files;
        const documents = this.newSubmissionUploadService.uploadSubmissionDocs(uploadedFiles, submissionId);
        return documents;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-submission-id')
    @UseFilters(HttpExceptionFilter)
    async getNextAvailableSubmissionId(@Query('fullName') fullName: string, @Query('currentUser') currentUser: string, @Query('userEmail') userEmail: string) {
        return await this.newSubmissionUploadService
            .getNextAvailableSubmissionId(fullName, currentUser, userEmail)
            .then((result) => {
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return value;
                } else {
                    throw new HttpException(
                        'Internal server error ',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            })
            .catch((err) => {
                this.loggerService.error(NewSubmissionUploadController.name, err.message, err, null, null, 'getNextAvailableSubmissionId')
                throw new HttpException(
                    'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    @UseGuards(JwtAuthGuard)
    @Post('/process-new-submission')
    @UseFilters(HttpExceptionFilter)
    async processNewSubmissionWorkflowData(@Body() submissionForm: SubmissionForm) {
        return await this.newSubmissionUploadService
            .processNewSubmissionWorkflowData(submissionForm)
            .then((result) => {
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return value;
                } else {
                    throw new HttpException(
                        'Internal server error ',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            })
            .catch((err) => {
                this.loggerService.error(NewSubmissionUploadController.name, err.message, err, null, null, 'processNewSubmissionWorkflowData')
                throw new HttpException(
                    'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
}
