import { Module } from '@nestjs/common';
import { AcordUploadController } from '../controllers/acord-upload.controller';
import { UserLogsController } from '../controllers/user-logs.controller';
import { AcordUploadService } from '../services/acord-upload.service';
import { UserLogsService } from '../services/user-logs.service';
import { UserLogsModule } from './user-logs.module';
import { LoggerService } from 'src/common/services/logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/portico-market-match/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        UserLogsModule
    ],
    controllers: [UserLogsController, AcordUploadController],
    providers: [UserLogsService, AcordUploadService, LoggerService],
    exports: [UserLogsService, AcordUploadService, AcordUploadModule]
})
export class AcordUploadModule { }
