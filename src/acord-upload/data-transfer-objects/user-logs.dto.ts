import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UserLogsDto {


    @ApiProperty({ type: String })
    @IsString()
    readonly agency: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly region: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly session_id: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly datetime: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly user_name: string;

    @ApiProperty({ type: String })
    @IsString()
    readonly user_email: string;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    file_upload_page_loaded?: boolean

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly file_uploaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly azure_data_returned?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly agency_info_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly applicant_info_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly premises_info_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly business_nature_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly additional_info_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly claims_and_losses_info_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    readonly summary_page_loaded?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    readonly summary_form_downloaded?: boolean;

}

