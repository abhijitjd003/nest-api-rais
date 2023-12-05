import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchDnBController } from "../controllers/search-dnb.controller";

import { UserLogsModule } from "../modules/user-logs.module";
import { UserLogsService } from "../services/user-logs.service";
import { DnbRequestService } from "src/common/services/dnb-request.service";
import { ErrorhelperService } from "src/common/services/error-helper.service";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { SearchEntity } from "../entities/search.entity";
import { SearchController } from "../controllers/search.controller";
import { SearchService } from "../services/search.service";
import { LoggerService } from "../../common/services/logger.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../entities/user.entity";
import { UsersModule } from "./users.module";
import { Relativity6RequestService } from "src/common/services/relativity6-request.service";
import { SearchRelativity6Controller } from "../controllers/search-relativity6.controller";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        UsersModule,
        UserLogsModule,
        TypeOrmModule.forFeature([SearchEntity]),
    ],
    providers: [
        ConfigService,
        SearchService,
        HttpExceptionFilter,
        ErrorhelperService,
        UserLogsService,
        DnbRequestService,
        LoggerService,
        Relativity6RequestService
    ],
    controllers: [SearchController, SearchDnBController, SearchRelativity6Controller],
    exports: [SearchService],
})
export class SearchModule { }
