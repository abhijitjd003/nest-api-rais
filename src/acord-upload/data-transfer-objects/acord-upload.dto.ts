import { ApiProperty } from "@nestjs/swagger";
import { Blob } from "buffer";
import { IsNotEmpty } from "class-validator";

export class AcordUploadDto {
    @ApiProperty({
        description: "document"
    })
    @IsNotEmpty()
    readonly document: Blob;

}
