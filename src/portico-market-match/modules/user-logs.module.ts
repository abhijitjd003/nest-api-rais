import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogsController } from '../controllers/user-logs.controller';
import { UserLog, UserLogSchema } from '../entities/user-log.entity';
import { UserLogsService } from '../services/user-logs.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: UserLog.name, schema: UserLogSchema, collection: 'portico_market_match_usage_logs' }],
            'appdb',
        )
    ],
    controllers: [UserLogsController],
    providers: [UserLogsService],
    exports: [MongooseModule, UserLogsService]
})
export class UserLogsModule { }
