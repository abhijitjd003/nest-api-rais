import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PorticoNewSubmissionsController } from '../controllers/portico-new-submissions.controller';
import { DocumentTypeEntity } from '../entities/document-type.entity';
import { PorticoNewSubmissionsService } from '../services/portico-new-submissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/portico-market-match/entities/user.entity';
import { NewSubmissionUploadController } from '../controllers/new-submission-upload.controller';
import { NewSubmissionUploadService } from '../services/new-submission-upload.service';
import { LoggerService } from 'src/common/services/logger.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { LOBEntity } from '../entities/line-of-business.entity';
import { LinesOfBusinessService } from '../services/lines-of-business.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentTypeEntity, LOBEntity]),
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
    ],
    controllers: [NewSubmissionUploadController, PorticoNewSubmissionsController],
    providers: [NewSubmissionUploadService, LoggerService, PorticoNewSubmissionsService, ErrorhelperService, LinesOfBusinessService],
    exports: [NewSubmissionUploadService]
})
export class PorticoNewSubmissionsModule { }
