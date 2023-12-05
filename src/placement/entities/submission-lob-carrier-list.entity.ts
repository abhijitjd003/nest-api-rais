import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.udp_MAPS_GetSubmissionLobCarrierList")
export class MapsLobCarrierListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    LineOfBusiness: string;

    @Column({ length: 100 })
    Carrier: string;

    @Column()
    TargetDate: Date;

    @Column()
    EffectiveDate: Date;

}