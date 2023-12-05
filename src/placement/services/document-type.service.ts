import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeEntity } from '../entities/document-type.entity';

@Injectable()
export class DocumentTypeService {

    constructor(
        @InjectRepository(DocumentTypeEntity)
        private documentTypeRepository: Repository<DocumentTypeEntity>,
    ) { }

    getAllDocumentTypes() {
        let query = 'Select DocumentType, DocumentCategory FROM Submissions.dbo.SubmissionDocumentTypes WHERE Active = 1 order by DocumentType'
        return this.documentTypeRepository.query(query);
    }
}

