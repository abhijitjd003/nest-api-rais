import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsRequestCarrierNoteDto } from '../data-transfer-objects/maps-request-carrier-note.dto';
import { MapsRequestCarrierNoteEntity } from '../entities/submission-maps-request-carrier-note.entity';

@Injectable()
export class MapsRequestCarrierNoteService {
    constructor(
        @InjectRepository(MapsRequestCarrierNoteEntity)
        private mapsRequestCarrierNoteRepository: Repository<MapsRequestCarrierNoteEntity>,
    ) { }

    async createMapsRequestCarrierNote(mapsRequestCarrierNoteDto: MapsRequestCarrierNoteDto) {
        return await this.mapsRequestCarrierNoteRepository.save(mapsRequestCarrierNoteDto);
    }

    async getMapsRequestCarrierNoteDetails(submissionid: string, lineofbusiness: string, carrier: string): Promise<MapsRequestCarrierNoteEntity[]> {
        return this.mapsRequestCarrierNoteRepository.find({
            where: {
                SubmissionId: submissionid,
                LineOfBusiness: lineofbusiness,
                Carrier: carrier
            }
        })
    }
}

