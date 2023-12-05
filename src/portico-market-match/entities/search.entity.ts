import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("RAISDataModel.dbo.vDimDUNSMatchedWithCustomer")
export class SearchEntity {
    @PrimaryGeneratedColumn()
    ADBIDCustomerID: string;

    @Column()
    SortName: string;

    @Column()
    FullAddress: string;

    @Column()
    DoingBusinessAs: string;

    @Column()
    NAICSDescrPriority1: string;

    @Column()
    NAICSCodePriority1: string;
}