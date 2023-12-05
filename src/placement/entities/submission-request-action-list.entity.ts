import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.udp_MAPS_GetSubmissionRequestActionList")
export class MapsRequestActionListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    SubmissionId: string;

    @Column()
    ActionDateTime: Date;

    @Column()
    ActionType: string;

    @Column()
    ActionText: string;
}