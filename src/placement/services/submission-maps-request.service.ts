import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsRequestDto } from '../data-transfer-objects/maps-request.dto';
import { MapsRequestEntity } from '../entities/submission-maps-request.entity';

@Injectable()
export class MapsRequestService {
    constructor(
        @InjectRepository(MapsRequestEntity)
        private mapsRequestRepository: Repository<MapsRequestEntity>,
    ) { }

    async createMapsRequest(mapsRequestDto: MapsRequestDto) {
        return await this.mapsRequestRepository.save(mapsRequestDto)
    }

    async updateMapsRequestIsLatest(submissionid: string): Promise<MapsRequestEntity> {
        await this.mapsRequestRepository.update({ SubmissionId: submissionid }, { IsLatest: false });
        return this.mapsRequestRepository.findOne({ where: { SubmissionId: submissionid } });
    }

    async getMapsRequestDetails(submissionid: string): Promise<MapsRequestDto> {
        let queryResult: MapsRequestDto;
        let res: MapsRequestDto[];
        if (submissionid) {
            let sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionRequest @SubmissionId = '${submissionid}'`;
            await this.mapsRequestRepository.query(sql)
                .then(res => {
                    queryResult = res[0];
                })
                .catch((exception) => {
                    throw exception;
                });
        }
        return queryResult;
    }

}

