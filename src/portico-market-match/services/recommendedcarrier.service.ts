import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogsService } from '../services/user-logs.service';
import { Repository } from 'typeorm';
import { CleansedLobEntity } from '../entities/cleansed-lob.entity';
import { RecommendedCarrierEntity } from '../entities/recommendedcarrier.entity';

@Injectable()
export class RecommendedCarrierService {
    constructor(
        @InjectRepository(RecommendedCarrierEntity)
        private rcRepository: Repository<RecommendedCarrierEntity>,
        @InjectRepository(CleansedLobEntity)
        private cleansedLobRepository: Repository<CleansedLobEntity>,
        private userLogsService: UserLogsService,
    ) { }

    async recommendedCarrierPols(naicscode: string) {
        let queryResult;
        if (naicscode) {
            let sql = `exec dbo.udp_GetAppetiteCheckRecommendedCarriers @NAICSCode = ${naicscode}`;
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

    async cleansedLobs(): Promise<CleansedLobEntity[]> {
        let sql =
            `;WITH CTE
            AS
            (
            SELECT CleansedLOBDescription
            ,COUNT(*) AS CountLOB
            FROM dbo.factPolicyTermType
            WHERE PolEffDate >= DateAdd(month, - 12, GetDate())
            AND PolEffDate <= GetDate() AND Category != 'Lost' AND Cleansed_PL_CL_LAH = 'CL'
            GROUP By CleansedLOBDescription
            )SELECT DISTINCT CTE.CleansedLOBDescription FROM CTE
            JOIN RAISDataModel.dbo.dimLOBCleanup lob
            ON CTE.CleansedLOBDescription = lob.CleansedLOBDescription
            AND CountLOB >=10`;
        return this.cleansedLobRepository.query(sql).then((res) => {
            return res;
        }).catch((exception) => {
            throw exception;
        });

    }
}
