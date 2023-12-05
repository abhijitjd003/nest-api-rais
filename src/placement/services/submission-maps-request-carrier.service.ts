import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsRequestCarrierDto } from '../data-transfer-objects/maps-request-carrier.dto';
import { MapsRequestCarrierEntity } from '../entities/submission-maps-request-carrier.entity';

@Injectable()
export class MapsRequestCarrierService {
    constructor(
        @InjectRepository(MapsRequestCarrierEntity)
        private mapsRequestCarrierRepository: Repository<MapsRequestCarrierEntity>,
    ) { }

    async createMapsRequestCarrier(mapsRequestCarrierDto: MapsRequestCarrierDto) {
        return await this.mapsRequestCarrierRepository.save(mapsRequestCarrierDto)
    }

    async updateMapsRequestCarrier(id: string, carr: Partial<MapsRequestCarrierEntity>): Promise<MapsRequestCarrierEntity> {
        await this.mapsRequestCarrierRepository.update(id, carr);
        return this.mapsRequestCarrierRepository.findOne({ where: { ID: id } });
    }

    async getMapsRequestCarrierDetails(submissionid: string, lineofbusiness: string, carrier: string): Promise<MapsRequestCarrierEntity> {
        return this.mapsRequestCarrierRepository.findOne({
            where: {
                IsLatest: true,
                SubmissionId: submissionid,
                LineOfBusiness: lineofbusiness,
                Carrier: carrier
            }
        })
    }
}

