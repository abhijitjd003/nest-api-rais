import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import configurationYaml from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { DnbRequestService } from './common/services/dnb-request.service';
import { RecommendedCarrierModule } from './portico-market-match/modules/recommendedcarrier.module';
import { SearchModule } from './portico-market-match/modules/search.module';
import { UserLogsModule } from './portico-market-match/modules/user-logs.module';
import { UsersModule } from './portico-market-match/modules/users.module';
import { LoggerService } from './common/services/logger.service'
import { GlobalHttpModule } from './global-http.module'
import { MailerModule } from './mailer/mailer.module';
import { User, UserSchema } from './portico-market-match/entities/user.entity';
import { UsersService } from './portico-market-match/services/users.service';
import { HubspotModule } from './hubspot/hubspot.module';
import { MarketMatchProspectsModule } from './market-match-prospects/modules/market-match-prospects.module';
import { InsuredPremiumPaymentsModule } from './insured-premium-payment/insured-premium-payments.module';
import { CashReceiptEntity } from './insured-premium-payment/cashreceipt.entity';
import { CashReceiptDeletedRecordDetails } from './insured-premium-payment/entities/cash-receipt-delete-record.entity';
import { AcordUploadModule } from './acord-upload/modules/acord-upload.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PorticoNewSubmissionsModule } from './portico-new-submissions/modules/portico-new-submissions.module';
import { PlacementModule } from './placement/modules/placement.module';
import { CarrierModule } from './carrier/modules/carrier-contracts.module';

function getMongoUrl(configService: ConfigService): string {
    const username = configService.get<string>('db.mongo.MONGO_USERNAME');
    const password = configService.get<string>('db.mongo.MONGO_PASSWORD');
    const host = configService.get<string>('db.mongo.MONGO_HOST');
    const database = configService.get<string>('db.mongo.MONGO_DB_NAME');
    const appName = configService.get<string>('db.mongo.APP_NAME');
    const replicaset = configService.get<string>('db.mongo.MONGO_REPLICA_SET');

    // return mongo_url;
    const mongo_url = `mongodb://${username}:${password}@${host}/${database}?ssl=true&replicaSet=${replicaset}&retrywrites=false&maxIdleTimeMS=120000&appName=@${appName}@`;
    return mongo_url;
}

export const MONGO_CONNECTION_NAME = 'appdb';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configurationYaml],
            isGlobal: true,
        }),
        // CacheModule.register({
        //   ttl: CACHE_TTL,
        //   max: 1000,
        //   isGlobal: true,
        // }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<string>('db.redis.host'),
                port: configService.get<number>('db.redis.port'),
                auth_pass: configService.get<number>('db.redis.password'),
                ttl: configService.get<number>('db.redis.ttl'),
                max: configService.get<number>('db.redis.max-items'),
                // tls: {
                //   host: 'redis-11680.c56.east-us.azure.cloud.redislabs.com',
                // },
            }),
            isGlobal: true,
        }),
        // CacheModule.register({
        //   ttl: CACHE_TTL,
        //   // max: 1000,
        //   store: redisStore,
        //   port: 11680,
        //   auth_pass: 'SpwvAgywzB0bP6Czz6jTDe39jBrm3Nty',
        //   host: 'redis-11680.c56.east-us.azure.cloud.redislabs.com',
        //   // tls: {
        //   //   host: 'redis-11680.c56.east-us.azure.cloud.redislabs.com',
        //   // },
        //   isGlobal: true
        // }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: getMongoUrl(configService),
            }),
            inject: [ConfigService],
            connectionName: MONGO_CONNECTION_NAME,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mssql',
                host: configService.get<string>('db.mssql.db1.DB_HOST'),
                port: configService.get<number>('db.mssql.db1.DB_PORT'),
                username: configService.get<string>('db.mssql.db1.DB_USER'),
                password: configService.get<string>('db.mssql.db1.DB_PASSWORD'),
                database: configService.get<string>('db.mssql.db1.DB_NAME'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                dropSchema: false,
                requestTimeout: 100000,
                extra: {
                    trustServerCertificate: true,
                },
                options: {
                    encrypt: false,
                    cancelTimeout: 10000,
                },
                // dialectOptions: {
                //   options: {
                //     requestTimeout: 3000
                //   }
                // }
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'dwfinance',
            useFactory: async (configService: ConfigService) => ({
                type: 'mssql',
                host: configService.get<string>('db.mssql.db2.DB_HOST'),
                port: configService.get<number>('db.mssql.db2.DB_PORT'),
                username: configService.get<string>('db.mssql.db2.DB_USER'),
                password: configService.get<string>('db.mssql.db2.DB_PASSWORD'),
                database: configService.get<string>('db.mssql.db2.DB_NAME'),
                entities: [CashReceiptEntity, CashReceiptDeletedRecordDetails],
                synchronize: false,
                dropSchema: false,
                requestTimeout: 100000,
                extra: {
                    trustServerCertificate: true,
                },
                options: {
                    encrypt: false,
                    cancelTimeout: 10000,
                },
            }),
        } ),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'dwfinance',
            useFactory: async (configService: ConfigService) => ({
                type: 'mssql',
                host: configService.get<string>('db.mssql.db3.DB_HOST'),
                port: configService.get<number>('db.mssql.db3.DB_PORT'),
                username: configService.get<string>('db.mssql.db3.DB_USER'),
                password: configService.get<string>('db.mssql.db3.DB_PASSWORD'),
                database: configService.get<string>('db.mssql.db3.DB_NAME'),
                entities: [CashReceiptEntity, CashReceiptDeletedRecordDetails],
                synchronize: false,
                dropSchema: false,
                requestTimeout: 100000,
                extra: {
                    trustServerCertificate: true,
                },
                options: {
                    encrypt: false,
                    cancelTimeout: 10000,
                },
            }),
        }),

        MongooseModule.forFeature(
            [{ name: User.name, schema: UserSchema, collection: 'users' }],
            'appdb',
        ),
        MulterModule.register({
            dest: './uploaded-acord-forms'
        }),
        SearchModule,
        AuthModule,
        UsersModule,
        RecommendedCarrierModule,
        UserLogsModule,
        ScheduleModule.forRoot(),
        GlobalHttpModule,
        MailerModule,
        HubspotModule,
        MarketMatchProspectsModule,
        InsuredPremiumPaymentsModule,
        AcordUploadModule,
        PorticoNewSubmissionsModule,
        PlacementModule,
        CarrierModule
    ],
    exports: [LoggerService],
    controllers: [AppController],
    providers: [
        AppService,
        DnbRequestService,
        LoggerService
    ],
})
export class AppModule { }
