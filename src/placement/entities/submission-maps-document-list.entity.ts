import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierDocsList")
export class MapsDocumentListEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    DateAdded: string;

    @Column()
    FileName: string;

    @Column()
    DocumentType: string;

    @Column()
    DocumentCategory: string;

    @Column()
    LineOfBusiness: string;

    @Column()
    Carrier: string;

    @Column()
    FileExtnIcon: string;

    @Column()
    FilePath: string;

    @Column()
    CreatedBy: string;

    @Column()
    IsInternal: boolean;

}