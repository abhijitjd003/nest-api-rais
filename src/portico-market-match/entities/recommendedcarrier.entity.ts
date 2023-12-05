import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("RAISDataModel.dbo.udp_GetAppetiteCheckRecommendedCarriers")
export class RecommendedCarrierEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    carrier: string;

    @Column({ length: 50 })
    lob: string;

    @Column()
    poleffdate: Date;

    @Column()
    lnumber: number;

    @Column({ length: 62 })
    ADBIDPolId: string;

}