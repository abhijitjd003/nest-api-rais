import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UserLogDto {
    @ApiProperty({
        description: "Log ID"
    })
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiProperty({
        description: "Session Log ID"
    })
    @IsString()
    @IsNotEmpty()
    readonly session_log_id: string;

    @ApiProperty({
        description: "Session start timestamp"
    })
    @IsString()
    @IsNotEmpty()
    readonly session_start_datetime: string;

    @ApiProperty({
        description: "User ID"
    })
    @IsString()
    @IsNotEmpty()
    readonly user_id: string;

    @ApiProperty({
        description: "User Email"
    })
    @IsString()
    @IsNotEmpty()
    readonly user_email: string;

    @ApiProperty({
        description: "User Agency"
    })
    @IsNotEmpty()
    readonly agency: any;

    @ApiProperty({
        description: "Timestamp"
    })
    @IsString()
    @IsNotEmpty()
    readonly datetime: string;

    @ApiProperty({
        description: "User Event"
    })
    @IsString()
    @IsNotEmpty()
    readonly event: string;

    @ApiProperty({
        description: "Event Location"
    })
    @IsString()
    @IsNotEmpty()
    readonly location: string;

    @ApiProperty({
        description: "Event Details"
    })
    @IsString()
    @IsNotEmpty()
    readonly search_value: string;

    @ApiProperty({
        description: "Event Filters"
    })
    @IsBoolean()
    @IsNotEmpty()
    readonly selected: string;

    @ApiProperty({
        description: "Event Filters Details"
    })
    @IsString()
    @IsNotEmpty()
    readonly naics: string;

    @ApiProperty({
        description: "Event Filters Top Results"
    })
    @IsString()
    @IsNotEmpty()
    readonly state_filter: string;

    @ApiProperty({
        description: "Event Filters other results"
    })
    @IsString()
    @IsNotEmpty()
    readonly lob_filters: string;

    @IsString()
    @IsNotEmpty()
    readonly data: string;
}
