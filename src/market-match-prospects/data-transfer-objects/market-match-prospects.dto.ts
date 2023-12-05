import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MarketMatchProspectsDto {
    @ApiProperty({
        description: "Session ID"
    })
    @IsString()
    readonly session_id: string;

    @ApiProperty({
        description: "Prospect Name"
    })
    @IsString()
    readonly prospect_name: string;

    @ApiProperty({
        description: "Prospect Agency"
    })
    @IsString()
    readonly prospect_agency: string;

    @ApiProperty({
        description: "Prospect Email"
    })
    @IsString()
    readonly prospect_email: string;

    @ApiProperty({
        description: "Premium Range"
    })
    @IsString()
    readonly premium_range: string;

    @ApiProperty({
        description: "Prospect Role"
    })
    @IsString()
    readonly prospect_role: string;

    @ApiProperty({
        description: "Agency State"
    })
    @IsString()
    readonly agency_state: string;

    @ApiProperty({
        description: "First Page"
    })
    @IsString()
    readonly first_page: string;

    @ApiProperty({
        description: "Form Loaded"
    })
    @IsBoolean()
    readonly form_loaded: boolean;

    @ApiProperty({
        description: "Form Submitted"
    })
    @IsBoolean()
    readonly form_submitted: boolean;

    @ApiProperty({
        description: "Video Loaded"
    })
    @IsBoolean()
    readonly video_loaded: boolean;

    @ApiProperty({
        description: "Video Played"
    })
    @IsBoolean()
    readonly video_played: boolean;

}
