import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { LoggerService } from 'src/common/services/logger.service';
import { CashReceiptEntity } from './cashreceipt.entity';
import { AgencyConfigurationEntity } from './entities/agency-configuration.entity';
import { InusredPremiumPaymentService } from './insured-premium-payment.service';
import { InsuredPremiumPaymentsController } from './insured-premium-payments.controller';
import { CashReceiptDeletedRecordDetails } from './entities/cash-receipt-delete-record.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([CashReceiptEntity], 'dwfinance'),
        TypeOrmModule.forFeature([CashReceiptDeletedRecordDetails], 'dwfinance'),
        TypeOrmModule.forFeature([AgencyConfigurationEntity]),

    ],

    controllers: [InsuredPremiumPaymentsController],
    providers: [InusredPremiumPaymentService],
    exports: [InusredPremiumPaymentService]
})
export class InsuredPremiumPaymentsModule {

}
