import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsUnassignedSubListEntity } from '../entities/submission-unassigned-sub-list.entity';

@Injectable()
export class MapsUnassignedSubListService {
    constructor(
        @InjectRepository(MapsUnassignedSubListEntity)
        private rcRepository: Repository<MapsUnassignedSubListEntity>,
    ) { }

    async getMapsUnassignedSubList() {
        let queryResult;
        let sql = `exec Submissions.dbo.udp_MAPS_GetUnassignedSubmissionList`;
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
