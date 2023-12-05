import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsOpenCarrierListEntity } from '../entities/submission-open_carrier-list.entity';

@Injectable()
export class MapsOpenCarrierListService {
    constructor(
        @InjectRepository(MapsOpenCarrierListEntity)
        private rcRepository: Repository<MapsOpenCarrierListEntity>,
    ) { }

    async getMapsOpenCarrierList() {
        let queryResult;
        let sql = `exec Submissions.dbo.udp_MAPS_GetOpenCarrierList`;
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
