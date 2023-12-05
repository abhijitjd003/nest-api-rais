import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { UserLogsModule } from '../modules/user-logs.module';
import { UserLogsService } from '../services/user-logs.service';
import { CleansedLobEntity } from '../entities/cleansed-lob.entity';
import { RecommendedCarrierEntity } from '../entities/recommendedcarrier.entity';
import { RecommendedCarrierController } from '../controllers/recommendedcarrier.controller';
import { RecommendedCarrierService } from '../services/recommendedcarrier.service';
import { LoggerService } from 'src/common/services/logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        ConfigModule,
        UserLogsModule,
        TypeOrmModule.forFeature([RecommendedCarrierEntity]),
        TypeOrmModule.forFeature([CleansedLobEntity]),
    ],
    providers: [RecommendedCarrierService, UserLogsService, ErrorhelperService, LoggerService],
    controllers: [RecommendedCarrierController],
    exports: [RecommendedCarrierService],
})
export class RecommendedCarrierModule { }
