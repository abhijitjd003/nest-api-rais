import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MapsDocumentDto {

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly SubmissionId: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly AgencyDatabaseID: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly Category: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly FileName: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly FilePath: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly IsInternal: boolean;

    @ApiProperty({ type: String })
    @IsString()
    readonly LineOfBusiness: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly Carrier: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly CreatedBy: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly CreatedDateTime: string;

}
