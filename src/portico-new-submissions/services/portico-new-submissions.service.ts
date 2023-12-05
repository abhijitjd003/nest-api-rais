import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeEntity } from '../entities/document-type.entity';

@Injectable()
export class PorticoNewSubmissionsService {

    constructor(
        @InjectRepository(DocumentTypeEntity)
        private documentTypeRepository: Repository<DocumentTypeEntity>,
    ) { }

    findAll() {
        let query = 'Select DocumentType FROM Submissions.dbo.SubmissionDocumentTypes WHERE Active = 1'
        return this.documentTypeRepository.query(query);
    }
}

