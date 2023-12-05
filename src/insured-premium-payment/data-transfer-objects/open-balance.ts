import { ApiProperty } from "@nestjs/swagger";

export class OpenBalanceDto {
    policyeffectivedate: Date;
    effectiveaged: string;
    invoicedaged: string;
    totalamountdue: string;
    currentbalance: number;
    insuredname: string;
    invoicenumber: string;
    policynumber: string;
    agency: string;
    division: string;
}