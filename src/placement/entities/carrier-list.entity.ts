import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Submissions.dbo.udp_SBM_GetCarrierList")
export class CarrierListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    carrier: string;

}