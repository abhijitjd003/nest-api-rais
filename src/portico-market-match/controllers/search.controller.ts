import { Request, Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Query, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { DnbRequestService } from 'src/common/services/dnb-request.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SearchDetailDto } from '../data-transfer-objects/search-detail.dto';
import { SearchService } from '../services/search.service';
import { LoggerService } from 'src/common/services/logger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Search')
@ApiBearerAuth()
@Controller('api/v1/marketmatch')
export class SearchController {
    readonly logger = new Logger(SearchController.name);
    constructor(
        private readonly searchService: SearchService,
        private errorhelperService: ErrorhelperService,
        private dnBRequestService: DnbRequestService,
        private loggerService: LoggerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.searchService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/addDataIntoCache')
    @UseFilters(HttpExceptionFilter)
    async addDataIntoCache(@Request() req, @Res() res) {
        return await this.searchService
            .addDataIntoCache()
            .then((result) => {
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                } else {
                    let result = [];
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                }
            })
            .catch((e) => {
                let error;
                if (e.code == 'ETIMEOUT') {
                    error = this.errorhelperService.queryTimeOutResponse(e);
                    // this.logger.log(response);
                    //error = response;
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'addDataIntoCache')
                } else {
                    let result = [];
                    error = this.errorhelperService.commonResponse(result);
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'addDataIntoCache')
                }
                return res.json(error);
            });
    }

    @Cron('0 55 23 * * *')
    async refreshCache(@Request() req) {
        this.logger.log("Refresh cache started");
        this.searchService.addDataIntoCache().then((result) => {
            this.logger.log("Refresh cache completed");
        }, (err) => {
            this.logger.error("Refresh cache failed with error", err);
            this.loggerService.error(SearchController.name, err.message, err, req.user.email, req.headers.sessionid, 'refreshCache')
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/find-by')
    @UseFilters(HttpExceptionFilter)
    async search(@Request() req, @Res() res, @Query('search') search: string) {
        search = search.replace(/[^a-zA-Z0-9\.,\- ]/g, '');
        return await this.searchService
            .searchRecords(search)
            .then((result) => {
                // let value = this.errorhelperService.commonResponse(result);
                // return res.json(value);
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                } else {
                    let result = [];
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                }
            })
            .catch((e) => {
                let error;
                if (e.code == 'ETIMEOUT') {
                    error = this.errorhelperService.queryTimeOutResponse(e);
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'search')
                    // this.logger.log(response);
                    //error = response;
                } else {
                    let result = [];
                    error = this.errorhelperService.commonResponse(result);
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'search')
                }
                return res.json(error);
            });
    }

    @UseGuards(JwtAuthGuard)
    @Post('/search-detail')
    @UseFilters(HttpExceptionFilter)
    async searchDetailById(@Request() req, @Body() data: SearchDetailDto) {
        return await this.searchService
            .searchDetailRecords(data)
            .then((result) => {
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return value;
                } else {
                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            })
            .catch((err) => {
                this.loggerService.error(SearchController.name, err.message, err, req.user.email, req.headers.sessionid, 'searchDetailById')
                throw new HttpException(
                    'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/find-in-dnb?')
    @UseFilters(HttpExceptionFilter)
    async findDnB(@Request() req, @Res() res, @Query('search') search: string) {
        try {
            const tokenResponse = await this.dnBRequestService
                .getAccessToken()
                .then((result) => {
                    if (result) {
                        const response = {};
                        response['data'] = result;
                        response['message'] = 'Data found successfully';
                        response['status'] = 200;
                        return response;
                    } else {
                        this.logger.log('sdsdsd');
                    }
                });
            return res.json(tokenResponse);
        } catch (error) {
            this.logger.error(error);
            this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'findDnB')
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search-by-description?')
    @UseFilters(HttpExceptionFilter)
    async searchByDescription(@Request() req, @Res() res, @Query('search') search: string) {
        search = search.replace(/[^a-zA-Z0-9 ]/g, '');
        return await this.searchService
            .searchByDescription(search)
            .then((result) => {
                if (result) {
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                } else {
                    let result = [];
                    let value = this.errorhelperService.commonResponse(result);
                    return res.json(value);
                }
            })
            .catch((e) => {
                let error;
                if (e.code == 'ETIMEOUT') {
                    error = this.errorhelperService.queryTimeOutResponse(e);
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'searchByDescription');
                } else {
                    let result = [];
                    error = this.errorhelperService.commonResponse(result);
                    this.loggerService.error(SearchController.name, error.message, error, req.user.email, req.headers.sessionid, 'searchByDescription');
                }
                return res.json(error);
            });
    }
}
