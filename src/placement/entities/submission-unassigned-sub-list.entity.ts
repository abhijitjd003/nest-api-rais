import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.upd_MAPS_GetUnassignedSubmissionList")
export class MapsUnassignedSubListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    SubmissionId: string;

    @Column()
    SubmissionStatus: string;

    @Column()
    Agency: string;

    @Column()
    Client: string;

    @Column()
    Region: string;

    @Column()
    Opened: Date;

}