import { ApiProperty } from "@nestjs/swagger";
import { AppliedPaymentDto } from "./applied-payments";
import { OpenBalanceDto } from "./open-balance";
import { UnappliedPaymentDto } from "./unapplied-payments";

export class InsuredPremiumPaymentDto {
    @ApiProperty({
        description: "Unapplied Payment",
    })
    unappliedpayment: UnappliedPaymentDto[];

    @ApiProperty({
        description: "AppliedPayment",
    })
    appliedpayment: AppliedPaymentDto[];

    @ApiProperty({
        description: "Open Balances",
    })
    openbalance: OpenBalanceDto[];
}