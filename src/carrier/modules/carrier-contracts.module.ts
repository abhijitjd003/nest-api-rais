import { Module } from "@nestjs/common";
import { CarrierContractsController } from "../controllers/carrier-contracts.controller";
import { CarrierContractsService } from "../services/carrier-contracts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarrierContractsEntity } from "../entities/carrier-contracts.entity";
import { ErrorhelperService } from "../../common/services/error-helper.service";
import { LoggerService } from "src/common/services/logger.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../portico-market-match/entities/user.entity";

@Module( {
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        TypeOrmModule.forFeature([CarrierContractsEntity])
    ],
    controllers: [CarrierContractsController],
    providers: [ CarrierContractsService, ErrorhelperService, LoggerService ],
    exports: [CarrierContractsService]
})
export class CarrierModule { }
