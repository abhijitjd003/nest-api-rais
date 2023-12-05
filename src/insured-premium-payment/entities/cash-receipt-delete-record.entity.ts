import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('DWFinance.dbo.CashReceiptDeletedRecordDetails')
export class CashReceiptDeletedRecordDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ActivityDate: Date;

    @Column({ length: 500 })
    InsuredName: string;


    @Column({ length: 255 })
    AgencyName: string;

    @Column({ length: 50 })
    DepartmentName: string;


    @Column()
    Description: string;

    @Column()
    Amount: string;


    @Column({ length: 50, name: 'Policy#' })
    PolicyNumber: string;

    @Column({ length: 50 })
    Source: string;

    @Column()
    IsDeleted: boolean
}