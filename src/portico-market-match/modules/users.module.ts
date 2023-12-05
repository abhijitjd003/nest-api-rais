import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from 'src/common/services/logger.service';
import { AgencyConfigurationEntity } from 'src/insured-premium-payment/entities/agency-configuration.entity';
import { UsersController } from '../controllers/users.controller';
import { User, UserSchema } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        TypeOrmModule.forFeature([AgencyConfigurationEntity]),
    ],
    controllers: [UsersController],
    providers: [MongooseModule, UsersService, LoggerService
    ],
    exports: [UsersService],
})
export class UsersModule { }
