import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsRequestLobDto } from '../data-transfer-objects/maps-request-lob.dto';
import { MapsRequestLobEntity } from '../entities/submission-maps-request-lob.entity';

@Injectable()
export class MapsRequestLobService {
    constructor(
        @InjectRepository(MapsRequestLobEntity)
        private mapsRequestLobRepository: Repository<MapsRequestLobEntity>,
    ) { }

    async createMapsRequestLob(mapsRequestLobDto: MapsRequestLobDto) {
        return await this.mapsRequestLobRepository.save(mapsRequestLobDto)
    }

    async updateMapsRequestLob(id: string, lob: Partial<MapsRequestLobEntity>): Promise<MapsRequestLobEntity> {
        await this.mapsRequestLobRepository.update(id, lob);
        return this.mapsRequestLobRepository.findOne({ where: { ID: id } });
    }

    async getMapsRequestLobDetails(submissionid: string, lineofbusiness: string): Promise<MapsRequestLobEntity> {
        return this.mapsRequestLobRepository.findOne({
            where: {
                IsLatest: true,
                SubmissionId: submissionid,
                LineOfBusiness: lineofbusiness
            }
        })
    }
}

