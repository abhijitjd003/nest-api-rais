import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.upd_MAPS_GetOpenCarrierTaskList")
export class MapsOpenCarrierListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    SubmissionId: string;

    @Column()
    SubmissionStatus: string;

    @Column()
    Assignee: string;

    @Column()
    TargetDate: Date;

    @Column()
    LOB: string;

    @Column()
    Carrier: string;

    @Column()
    CarrierStatus: string;

    @Column()
    EffectiveDate: Date;

    @Column()
    PlacementSpecialist: string;

    @Column()
    Agency: string;

    @Column()
    Client: string;

    @Column()
    Region: string;

    @Column()
    Opened: Date;

    @Column()
    InfoComplete: Date;
}