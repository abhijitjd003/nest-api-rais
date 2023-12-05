import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("DWFinance.dbo.udp_GetCashReceiptDetails")
export class CashReceiptEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ActivityDate: Date;

    @Column({ length: 50 })
    InsuredName: string;

    @Column({ length: 50 })
    AgencyDatabaseID: string;

    @Column({ length: 50 })
    AgencyName: string;

    @Column({ length: 50 })
    DepartmentName: string;


    @Column({ length: 50 })
    Description: string;

    @Column()
    Amount: string;

    @Column()
    RemainingAmount: number;

    @Column({ length: 50, name: 'Invoice#' })
    InvoiceNumber: string;

    @Column({ length: 50, name: 'Policy#' })
    PolicyNumber: string;

    @Column({ length: 50, })
    AgeEff: string;

    @Column({ length: 50 })
    AgeInv: string;

    @Column({ length: 50 })
    Source: string;

}