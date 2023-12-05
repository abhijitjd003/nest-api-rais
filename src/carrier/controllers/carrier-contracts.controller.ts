import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CarrierContractsService } from "../services/carrier-contracts.service";
import { JwtAuthGuard } from "../../common/auth/jwt/jwt-auth.guard";
import { ErrorhelperService } from "../../common/services/error-helper.service";
import { LoggerService } from 'src/common/services/logger.service';

@ApiTags('Carrier')
@ApiBearerAuth()
@Controller('api/v1/carrier-contracts')
export class CarrierContractsController
{
    constructor (
        private readonly carrierContractService: CarrierContractsService,
        private errorhelperService: ErrorhelperService,
        private loggerService: LoggerService
    ) { }

    /**
     * This method fetches carrier contracts based on the region.
     * @param req Http request object.
     * @param res Http response object.
     * @param region Carrier contracts region passed as a query parameter.
     * @returns Callback API call to fetch all contracts by region.
     * @memberof CarrierContractsController
     */
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getCarrierContracts ( @Req() req, @Res() res, @Query( 'Region' ) region: string )
    {
        return await this.carrierContractService
            .getCarrierContracts( region )
            .then( ( result ) => {
                if ( result )
                {
                    let value = this.errorhelperService.commonResponse( result );
                    return res.json( value );
                } else
                {
                    let result = [];
                    let value = this.errorhelperService.commonResponse( result );
                    return res.json( value );
                }
            } )
            .catch( ( error ) => {
                this.loggerService.error( CarrierContractsController.name, error.message, error, req.user.email, req.headers.sessionid, 'getCarrierContracts' );
            })
    }

}
