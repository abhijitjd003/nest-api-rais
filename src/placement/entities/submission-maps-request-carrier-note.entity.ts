import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionMapsRequestCarrierNote")
export class MapsRequestCarrierNoteEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    SubmissionId: string;

    @Column()
    LineOfBusiness: string;

    @Column()
    AgencyDatabaseID: string;

    @Column()
    Carrier: string;

    @Column()
    Note: string;

    @Column()
    CreatedBy: string;

    @CreateDateColumn()
    CreatedDateTime: Date;
}
