import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsRequestActionListEntity } from '../entities/submission-request-action-list.entity';

@Injectable()
export class MapsRequestActionListService {
    constructor(
        @InjectRepository(MapsRequestActionListEntity)
        private rcRepository: Repository<MapsRequestActionListEntity>,
    ) { }

    async getMapsRequestActionList(submissionid: string) {
        let queryResult;
        if (submissionid) {
            let sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionRequestActionList @SubmissionId = '${submissionid}'`;
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
