import { ApiProperty } from "@nestjs/swagger";

export class AppliedPaymentDto {

    payementposteddate: Date;
    description: string;
    amount: string;
    insuredname: string;
    invoicenumber: string;
    policynumber: string;
    agency: string;
    division: string;
}