import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MapsRequestLobDto {

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
    @IsNotEmpty()
    readonly LineOfBusiness: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly EffectiveDate: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly TargetDate: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly TargetPremium: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly CreatedBy: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    readonly CreatedDateTime: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsNotEmpty()
    readonly IsLatest: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsNotEmpty()
    readonly IsSendToRater: boolean;
}
