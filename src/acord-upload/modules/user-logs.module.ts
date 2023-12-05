import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogsController } from '../controllers/user-logs.controller';
import { UserLogs, UserLogsSchema } from '../entities/user-logs.entity';
import { UserLogsService } from '../services/user-logs.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: UserLogs.name, schema: UserLogsSchema, collection: 'acord_upload_125_usage_logs' }],
            'appdb',
        )
    ],
    controllers: [UserLogsController],
    providers: [UserLogsService],
    exports: [MongooseModule, UserLogsService]
})
export class UserLogsModule { }
