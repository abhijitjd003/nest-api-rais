import { ApiProperty } from "@nestjs/swagger";

export class HubspotDataDto {
    @ApiProperty({
        description: "Submitted Date"
    })
    submittedAt: number;

    @ApiProperty({
        description: "Fields"
    })
    fields: FieldsObj[];
}

export class FieldsObj {
    @ApiProperty({
        description: "Name of the field"
    })
    name: string;

    @ApiProperty({
        description: "Value of the field"
    })
    value: string;
}
