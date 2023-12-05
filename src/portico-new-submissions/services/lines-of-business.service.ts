import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LOBEntity } from '../entities/line-of-business.entity';

@Injectable()
export class LinesOfBusinessService {

    constructor(
        @InjectRepository(LOBEntity)
        private lobRepository: Repository<LOBEntity>,
    ) { }

    getAllLOBs() {
        let queryToRun = 'SELECT LOBToShow, LOBGrouping FROM Submissions.dbo.SubmissionLOB WHERE Active = 1';
        return this.lobRepository.query(queryToRun);
    }
}

