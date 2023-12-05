import { Controller, Get, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { RecommendedCarrierService } from '../services/recommendedcarrier.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { LoggerService } from 'src/common/services/logger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Carrier')
@ApiBearerAuth()
@Controller('api/v1/recommendedcarrier')
export class RecommendedCarrierController {
    constructor(
        private readonly recommendedCarrierService: RecommendedCarrierService,
        private errorhelperService: ErrorhelperService,
        private loggerService: LoggerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/find-by')
    async getRecommendedCarriers(@Req() req, @Res() res, @Query('code') naicscode: string) {
        return await this.recommendedCarrierService
            .recommendedCarrierPols(naicscode)
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
            .catch((error) => {
                this.loggerService.error(RecommendedCarrierController.name, error.message, error, req.user.email, req.headers.sessionid, 'getRecommendedCarriers');
            });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/cleansed-lob')
    @UseFilters(HttpExceptionFilter)
    async getCleansedLob(@Req() req, @Res() res) {
        return await this.recommendedCarrierService
            .cleansedLobs()
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
            .catch((error) => {
                this.loggerService.error(RecommendedCarrierController.name, error.message, error, req.user.email, req.headers.sessionid, 'getCleansedLob');
            });
    }
}
