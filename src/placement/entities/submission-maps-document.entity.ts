import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionMasterUploadedFiles")
export class MapsDocumentEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    SubmissionId: string;

    @Column()
    AgencyDatabaseID: string;

    @Column()
    Category: string;

    @Column()
    FileName: string;

    @Column()
    FilePath: string;

    @Column()
    IsInternal: boolean;

    @Column()
    LineOfBusiness: string;

    @Column()
    Carrier: string;

    @Column()
    CreatedBy: string;

    @Column()
    CreatedDateTime: string;
}
