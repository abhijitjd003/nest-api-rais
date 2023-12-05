import { ApiProperty } from "@nestjs/swagger";

export class UnappliedPaymentDto {
    receiveddate: Date;
    description: string;
    amount: string;
    insuredname: string;
    policynumber: string;
    agency: string;
    division: string;
}