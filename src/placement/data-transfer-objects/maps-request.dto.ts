import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MapsRequestDto {

    @ApiProperty({ type: String })
    @IsString()
    readonly AgencyDatabaseID: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly Region: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly SubmissionId: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly AQApplicationId: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly AQApplicationUrl: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly CustomerID: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly ADBIDCustomerID: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly FullName: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly DoingBusinessAs: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly Addr1: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly Addr2: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly City: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly State: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly ZipCode: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly TypeOfBusiness: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly SubmissionType: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly TargetDate: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly RequestType: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly RequestTrack: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly AssignedTo: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly NAICSCode: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly NAICSDescription: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly SICCode: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly SICDescription: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly RequestStatus: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly IsNonRenewedCurrCarrier: boolean;

    @ApiProperty({ type: String })
    @IsString()
    readonly IsNonRenewedCurrCarrierReason: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly AccountStory: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly IsAlreadySubmittedToCarrier: boolean;

    @ApiProperty({ type: String })
    @IsString()
    readonly IsAlreadySubmittedToCarrierList: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly InformationCompleteDate: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly IsClosed: boolean;

    @ApiProperty({ type: String })
    @IsString()
    readonly CreatedBy: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly CreatedDateTime: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly IsLatest: boolean;

    @ApiProperty({ type: String })
    @IsString()
    readonly AgencyName?: string;
}


