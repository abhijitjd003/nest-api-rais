import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDto {
    @ApiProperty({
        description: "User Email",
    })
    email: string;

    @ApiProperty({
        description: "User Agency",
    })
    agency: string;

    @ApiProperty({
        description: "Timestamp when request acces button was clicked",
    })
    timestamp: string;
}
