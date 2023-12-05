import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Query,
    Request,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { DnbRequestService } from 'src/common/services/dnb-request.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { LoggerService } from 'src/common/services/logger.service';

@ApiTags('Search')
@ApiBearerAuth()
@Controller('api/v1/marketmatch/dnb')
export class SearchDnBController {
    readonly logger = new Logger(SearchDnBController.name);
    private sessionId: string = '';
    constructor(
        private errorhelperService: ErrorhelperService,
        private dnbRequestService: DnbRequestService,
        private loggerService: LoggerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/find-in-dnb?')
    @UseFilters(HttpExceptionFilter)
    async findDnB(@Request() req, @Res() res, @Query() search) {
        //If the access token hasn't been set, go get it
        this.sessionId = req.headers.sessionid;
        await this.getAccessToken(req.user.email);

        //Run the Entity Search, retry it only once if token invalid
        let retryCount: number = 0;
        const dnBSearchRes = await this.getSearchResults(req.user.email, search, retryCount);
        if (dnBSearchRes == null) {
            //If no data found, skip next level search
            let result = [];
            let value = this.errorhelperService.commonResponse(result);
            return res.json(value);
        } else if (dnBSearchRes.error) {
            this.logger.log('Error Message: ', dnBSearchRes.error.errorMessage);
            this.loggerService.error(SearchDnBController.name, dnBSearchRes.error.errorMessage, dnBSearchRes.error, req.user.email, this.sessionId, 'findDnB')
            return res.json(dnBSearchRes.error);
        }

        //If DnB returned some matches, retry it only once if token invalid
        retryCount = 0;
        const companyDataRes = await this.getCompanyData(
            req.user.email,
            dnBSearchRes,
            retryCount
        );
        return res.status(200).json(companyDataRes);
    }

    async getAccessToken(userEmail) {
        if (this.dnbRequestService.isTokenExpired()) {
            return await this.dnbRequestService
                .getAccessToken()
                .then((result: any) => {
                    if (result) {
                        this.dnbRequestService.setToken(result.access_token);
                    }
                })
                .catch((error) => {
                    this.loggerService.error(SearchDnBController.name, error.message, error, userEmail, this.sessionId, 'getAccessToken')
                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                });
        }
    }

    async getSearchResults(userEmail: string, search: any, retryCount: number) {
        const queryString =
            '?' +
            'Name=' +
            search.name +
            '&inLanguage=en-US' +
            '&streetAddressLine1' +
            search.streetAddressLine1 +
            '&countryISOAlpha2Code=US' +
            '&addressLocality=' +
            search.addressLocality +
            '&addressRegion=' +
            search.addressRegion +
            '&postalCode=' +
            search.postalCode +
            '&candidateMaximumQuantity=1' +
            '&confidenceLowerLevelThresholdValue=7';

        return this.dnbRequestService
            .getSearchResults(queryString, this.dnbRequestService.getToken())
            .then((result: any) => {
                if (result) {
                    return result;
                }
            })
            .catch(async (errMessage) => {
                if (errMessage === 'Unauthorized' && retryCount === 0) {
                    retryCount++;
                    this.loggerService.error(SearchDnBController.name, errMessage, null, userEmail, this.sessionId, 'getSearchResults')
                    this.dnbRequestService.resetToken();
                    await this.getAccessToken(userEmail);
                    await this.getSearchResults(userEmail, search, retryCount);
                } else {
                    this.loggerService.error(SearchDnBController.name, errMessage, null, userEmail, this.sessionId, 'getSearchResults')
                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }
            });
    }

    async getCompanyData(userEmail: string, dnBSearchRes, retryCount: number) {
        return await this.dnbRequestService
            .getCompanyData(
                dnBSearchRes.matchCandidates[0].organization.duns,
                this.dnbRequestService.getToken()
            )
            .then((result: any) => {
                if (result) {
                    const dnBCompanyRes = result;
                    let NAICSCodes1code = '';
                    let NAICSCodes1description = '';
                    let NAICSCodes2code = '';
                    let NAICSCodes2description = '';

                    for (let obj in dnBCompanyRes.organization.industryCodes) {
                        let tempObj =
                            dnBCompanyRes.organization.industryCodes[obj];
                        if (
                            (tempObj.typeDescription ==
                                'North American Industry Classification System 2017' ||
                                tempObj.typeDescription ==
                                'North American Industry Classification System 2022') &&
                            tempObj.priority == 1
                        ) {
                            NAICSCodes1code = tempObj.code;
                            NAICSCodes1description = tempObj.description;
                        }
                        if (
                            (tempObj.typeDescription ==
                                'North American Industry Classification System 2017' ||
                                tempObj.typeDescription ==
                                'North American Industry Classification System 2022') &&
                            tempObj.priority == 2
                        ) {
                            NAICSCodes2code = tempObj.code;
                            NAICSCodes2description = tempObj.description;
                        }
                    }

                    const data = {
                        duns: dnBCompanyRes.organization.duns,
                        primaryName: dnBCompanyRes.organization.primaryName,
                        FullAddress:
                            dnBCompanyRes.organization.primaryAddress
                                .streetAddress.line1 +
                            ' ' +
                            dnBCompanyRes.organization.primaryAddress
                                .addressLocality.name +
                            ', ' +
                            dnBCompanyRes.organization.primaryAddress
                                .addressRegion.abbreviatedName +
                            ' ' +
                            dnBCompanyRes.organization.primaryAddress
                                .postalCode,
                        NAICSCodePriority1: NAICSCodes1code,
                        NAICSDescrPriority1: NAICSCodes1description,
                        NAICSCodePriority2: NAICSCodes2code,
                        NAICSDescrPriority2: NAICSCodes2description,
                    };

                    return data;
                }
            })
            .catch(async (errMessage) => {
                if (errMessage === 'Unauthorized' && retryCount === 0) {
                    retryCount++;
                    this.loggerService.error(SearchDnBController.name, errMessage, null, userEmail, this.sessionId, 'getCompanyData')
                    this.dnbRequestService.resetToken();
                    await this.getAccessToken(userEmail);
                    await this.getCompanyData(userEmail, dnBSearchRes, retryCount);
                } else {
                    this.loggerService.error(SearchDnBController.name, errMessage, null, userEmail, this.sessionId, 'getCompanyData')
                    throw new HttpException(
                        'Internal server error',
                        HttpStatus.INTERNAL_SERVER_ERROR
                    );
                }
            });
    }
}
