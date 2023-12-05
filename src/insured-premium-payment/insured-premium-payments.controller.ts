import { Body, Controller, Get, LoggerService, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/auth/jwt/jwt-auth.guard";
import { ErrorhelperService } from "src/common/services/error-helper.service";
import { AppliedPaymentDto } from "./data-transfer-objects/applied-payments";
import { InusredPremiumPaymentService } from "./insured-premium-payment.service";

@ApiTags('Insured Premium Payments')
@Controller('api/v1/insured-premium-payments')
export class InsuredPremiumPaymentsController {
    constructor(
        private readonly insuredPremiumPaymentService: InusredPremiumPaymentService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/payment-details')
    async findAll(@Query('agency') agency?: string) {
        const decodedValues = agency.split('||').map(value => decodeURIComponent(value));
        return this.insuredPremiumPaymentService.getCashReceiptDetails(decodedValues);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/agencies')
    async getAllAgencies() {
        return this.insuredPremiumPaymentService.getAllAgencies();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/delete-applied-payment-detail')
    create(@Body() paymentdto: any) {
        return this.insuredPremiumPaymentService.create(paymentdto);
    }


    @UseGuards(JwtAuthGuard)
    @Get('/invoide-data-details')
    async getInvoiceDataDetails(@Query('invoicenumber') invoicenumber: string) {
        return this.insuredPremiumPaymentService.getInvoiceDataDetails(invoicenumber);
    }




}
