import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MapsRequestCarrierNoteDto {

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
        description: "Note"
    })
    @IsString()
    @IsNotEmpty()
    readonly Note: string;

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
}
