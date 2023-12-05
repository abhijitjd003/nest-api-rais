import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarrierContractsEntity } from "../entities/carrier-contracts.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarrierContractsService {

    constructor (
        @InjectRepository( CarrierContractsEntity )
        private carrierContractsRepository: Repository<CarrierContractsEntity>
    ) { }

    /**
     * This method fetches carrier contracts based on the region.
     * @param region Carrier contracts region passed as a string.
     * @returns Query result of carrier contracts by region.
     * @memberof CarrierContractsService
     */
    async getCarrierContracts ( region: string )
    {
        let queryResult;
        if ( region )
        {
            let sql = `exec MemberCentral.dbo.udp_GetCarrierContracts @Region = "${region}"`;
            await this.carrierContractsRepository.query( sql )
                .then( res => {
                    queryResult = res;
                } )
                .catch( ( exception ) => {
                    throw exception;
                })
        }
        return queryResult;
    }
}
