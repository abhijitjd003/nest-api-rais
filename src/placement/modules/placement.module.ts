import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementController } from '../controllers/placement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/portico-market-match/entities/user.entity';
import { LoggerService } from 'src/common/services/logger.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { MapsUploadService } from '../services/submission-maps-upload.service';
import { DocumentTypeEntity } from '../entities/document-type.entity';
import { LOBEntity } from '../entities/line-of-business.entity';
import { CarrierListEntity } from '../entities/carrier-list.entity';
import { UserListEntity } from '../entities/user-list.entity';
import { MapsLobCarrierListEntity } from '../entities/submission-lob-carrier-list.entity';
import { MapsDocumentListEntity } from '../entities/submission-maps-document-list.entity';
import { MapsDocumentEntity } from '../entities/submission-maps-document.entity';
import { MapsRequestEntity } from '../entities/submission-maps-request.entity';
import { MapsRequestLobEntity } from '../entities/submission-maps-request-lob.entity';
import { MapsRequestCarrierEntity } from '../entities/submission-maps-request-carrier.entity';
import { MapsRequestCarrierNoteEntity } from '../entities/submission-maps-request-carrier-note.entity';
import { MapsRequestActionListEntity } from '../entities/submission-request-action-list.entity';
import { MapsOpenCarrierListEntity } from '../entities/submission-open_carrier-list.entity';
import { MapsUnassignedSubListEntity } from '../entities/submission-unassigned-sub-list.entity';
import { DocumentTypeService } from '../services/document-type.service';
import { LinesOfBusinessService } from '../services/lines-of-business.service';
import { CarrierListService } from '../services/carrier-list.service';
import { UserListService } from '../services/user-list.service';
import { MapsDocumentListService } from '../services/submission-maps-document-list.service';
import { MapsDocumentService } from '../services/submission-maps-document.service';
import { MapsLobCarrierListService } from '../services/submission-lob-carrier-list.service';
import { MapsRequestService } from '../services/submission-maps-request.service';
import { MapsRequestLobService } from '../services/submission-maps-request-lob.service';
import { MapsRequestCarrierService } from '../services/submission-maps-request-carrier.service';
import { MapsRequestCarrierNoteService } from '../services/submission-maps-request-carrier-note.service';
import { MapsRequestActionListService } from '../services/submission-request-action-list.service';
import { MapsOpenCarrierListService } from '../services/submission-open-carrier-list.service';
import { MapsUnassignedSubListService } from '../services/submission-unassigned-sub-list.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DocumentTypeEntity,
            LOBEntity,
            CarrierListEntity,
            UserListEntity,
            MapsDocumentListEntity,
            MapsDocumentEntity,
            MapsLobCarrierListEntity,
            MapsRequestEntity,
            MapsRequestLobEntity,
            MapsRequestCarrierEntity,
            MapsRequestCarrierNoteEntity,
            MapsRequestActionListEntity,
            MapsOpenCarrierListEntity,
            MapsUnassignedSubListEntity
        ]),
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
    ],
    controllers: [PlacementController],
    providers: [
        LoggerService,
        ErrorhelperService,
        MapsUploadService,
        DocumentTypeService,
        LinesOfBusinessService,
        CarrierListService,
        UserListService,
        MapsDocumentListService,
        MapsDocumentService,
        MapsLobCarrierListService,
        MapsRequestService,
        MapsRequestLobService,
        MapsRequestCarrierService,
        MapsRequestCarrierNoteService,
        MapsRequestActionListService,
        MapsOpenCarrierListService,
        MapsUnassignedSubListService,
    ]
})
export class PlacementModule { }
