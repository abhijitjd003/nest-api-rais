import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrierListEntity } from '../entities/carrier-list.entity';

@Injectable()
export class CarrierListService {
    constructor(
        @InjectRepository(CarrierListEntity)
        private rcRepository: Repository<CarrierListEntity>,
    ) { }

    async getAllCarriers() {
        let queryResult;
        let sql = 'exec Submissions.dbo.udp_SBM_GetCarrierList';
        await this.rcRepository.query(sql)
            .then(res => {
                queryResult = res;
            })
            .catch((exception) => {
                throw exception;
            });
        return queryResult;
    }
}
