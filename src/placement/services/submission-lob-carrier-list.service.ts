import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsLobCarrierListEntity } from '../entities/submission-lob-carrier-list.entity';

@Injectable()
export class MapsLobCarrierListService {
    constructor(
        @InjectRepository(MapsLobCarrierListEntity)
        private rcRepository: Repository<MapsLobCarrierListEntity>,
    ) { }

    async getMapsLobCarrierList(submissionid: string) {
        let queryResult;
        if (submissionid) {
            let sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierList @SubmissionId = '${submissionid}'`;
            await this.rcRepository.query(sql)
                .then(res => {
                    queryResult = res;
                })
                .catch((exception) => {
                    throw exception;
                });
        }
        return queryResult;
    }

}
