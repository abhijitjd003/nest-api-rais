import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDetailDto {
    @ApiProperty({
        description: "User Id"
    })
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @ApiProperty({
        description: "User Log"
    })
    @IsNotEmpty()
    readonly log: any;

    @ApiProperty({
        description: "Search value"
    })
    @IsString()
    @IsNotEmpty()
    readonly search: string;
}
