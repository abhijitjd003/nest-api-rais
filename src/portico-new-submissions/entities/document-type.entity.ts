import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionDocumentTypes")
export class DocumentTypeEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    Category: string;

    @Column()
    DocumentType: string;

    @Column()
    Active: number;

    @Column()
    CreatedBy: string;

    @Column()
    CreatedDate: string;

}
