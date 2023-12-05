import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionLOB")
export class LOBEntity {
    @PrimaryColumn()
    LOBToShow: string;

    @Column()
    LOBGrouping: string;
}
