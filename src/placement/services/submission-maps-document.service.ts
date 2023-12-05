import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapsDocumentDto } from '../data-transfer-objects/maps-document.dto';
import { MapsDocumentEntity } from '../entities/submission-maps-document.entity';

@Injectable()
export class MapsDocumentService {
    constructor(
        @InjectRepository(MapsDocumentEntity)
        private mapsDocumentRepository: Repository<MapsDocumentEntity>,
    ) { }

    async createMapsDocument(mapsDocumentDto: MapsDocumentDto) {
        return await this.mapsDocumentRepository.save(mapsDocumentDto)
    }

    async updateMapsDocument(id: string, doc: Partial<MapsDocumentDto>): Promise<MapsDocumentEntity> {
        await this.mapsDocumentRepository.update(id, doc);
        return this.mapsDocumentRepository.findOne({ where: { Id: id } });
    }

}

