import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "User Email"
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: "User Pasword"
    })
    @IsString()
    readonly password: string;

    @ApiProperty({
        description: "User Type"
    })
    @IsString()
    @IsNotEmpty()
    readonly type: string;
}
