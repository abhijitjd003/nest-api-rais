import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MapsRequestCarrierDto {

    @ApiProperty({
        description: "Submission ID"
    })
    @IsString()
    @IsNotEmpty()
    readonly SubmissionId: string;

    @ApiProperty({
        description: "Line Of Business"
    })
    @IsString()
    @IsNotEmpty()
    readonly LineOfBusiness: string;

    @ApiProperty({
        description: "AgencyDatabaseID"
    })
    @IsString()
    @IsNotEmpty()
    readonly AgencyDatabaseID: string;

    @ApiProperty({
        description: "Carrier"
    })
    @IsString()
    @IsNotEmpty()
    readonly Carrier: string;

    @ApiProperty({
        description: "Effective Date"
    })
    @IsString()
    readonly EffectiveDate: string;

    @ApiProperty({
        description: "Assigned To"
    })
    @IsString()
    readonly AssignedTo: string;

    @ApiProperty({
        description: "Rating Path"
    })
    @IsString()
    readonly RatingPath: string;

    @ApiProperty({
        description: "Quoted Premium"
    })
    @IsString()
    readonly QuotedPremium: string;

    @ApiProperty({
        description: "Outcome"
    })
    @IsString()
    readonly Outcome: string;

    @ApiProperty({
        description: "Outcome Details"
    })
    @IsString()
    readonly OutcomeDetails: string;

    @ApiProperty({
        description: "Denial Reason"
    })
    @IsString()
    readonly DenialReason: string;

    @ApiProperty({
        description: "IsBound"
    })
    @IsString()
    readonly IsBound: string;

    @ApiProperty({
        description: "Bound Premium"
    })
    @IsString()
    readonly BoundPremium: string;

    @ApiProperty({
        description: "PolNo"
    })
    @IsString()
    readonly PolNo: string;

    @ApiProperty({
        description: "Carrier Status"
    })
    @IsString()
    readonly CarrierStatus: string;

    @ApiProperty({
        description: "Start Date"
    })
    @IsString()
    readonly StartDate: string;

    @ApiProperty({
        description: "Completion Date"
    })
    @IsString()
    readonly CompletionDate: string;

    @ApiProperty({
        description: "IsMasterCode"
    })
    @IsString()
    readonly IsMasterCode: string;

    @ApiProperty({
        description: "Bill Type"
    })
    @IsString()
    readonly BillType: string;

    @ApiProperty({
        description: "Created By"
    })
    @IsString()
    @IsNotEmpty()
    readonly CreatedBy: string;

    @ApiProperty({
        description: "CreatedDateTime"
    })
    @IsString()
    @IsNotEmpty()
    readonly CreatedDateTime: string;

    @ApiProperty({
        description: "IsLatest"
    })
    @IsString()
    @IsNotEmpty()
    readonly IsLatest: string;

}
