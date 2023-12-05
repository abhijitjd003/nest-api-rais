import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsDocumentListEntity } from '../entities/submission-maps-document-list.entity';

@Injectable()
export class MapsDocumentListService {
    constructor(
        @InjectRepository(MapsDocumentListEntity)
        private mapsDocumentListRepository: Repository<MapsDocumentListEntity>,
    ) { }

    async getMapsDocumentList(submissionid: string, lineofbusiness?: string, carrier?: string) {
        let queryResult;
        if (submissionid) {
            let sql: string = "";
            if (lineofbusiness && carrier) {
                lineofbusiness = lineofbusiness.replace(/'/g, "''");
                carrier = carrier.replace(/'/g, "''");
                sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierDocsList @SubmissionId = '${submissionid}', @LineOfBusiness = '${lineofbusiness}', @Carrier = '${carrier}'`;
            }
            else if (lineofbusiness) {
                lineofbusiness = lineofbusiness.replace(/'/g, "''");
                sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierDocsList @SubmissionId = '${submissionid}', @LineOfBusiness = '${lineofbusiness}'`;
            }
            else {
                sql = `exec Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierDocsList @SubmissionId = '${submissionid}'`;
            }
            await this.mapsDocumentListRepository.query(sql)
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
