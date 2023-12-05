import {
    Controller,
    Post,
    HttpException,
    HttpStatus,
    Logger,
    Body,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { LoggerService } from 'src/common/services/logger.service';
import { Relativity6RequestService } from 'src/common/services/relativity6-request.service';
import { Relativity6Entity } from '../entities/relativity6.entity';

@ApiTags('Search')
@ApiBearerAuth()
@Controller('api/v1/marketmatch/relativity6')
export class SearchRelativity6Controller {
    readonly logger = new Logger(SearchRelativity6Controller.name);
    constructor(
        private errorhelperService: ErrorhelperService,
        private relativity6RequestService: Relativity6RequestService,
        private loggerService: LoggerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/find-in-relativity6')
    @UseFilters(HttpExceptionFilter)
    async searchRelativity6Data(@Body() data: Relativity6Entity) {
        return await this.relativity6RequestService
            .getRelativity6Data(data)
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
                this.loggerService.error(SearchRelativity6Controller.name, err.message, err, null, null, 'searchRelativity6Data')
                throw new HttpException(
                    'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });
    }
}
