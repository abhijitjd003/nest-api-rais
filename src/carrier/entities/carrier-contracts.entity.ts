import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("MemberCentral.dbo.udp_GetCarrierContracts")
export class CarrierContractsEntity
{
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    Region: string;

    @Column()
    Carrier: string;

    @Column()
    Designation: string;

    @Column()
    RiskSize: string;

    @Column()
    lobType: string;

    @Column()
    ProfitShareLowPercentage: number;

    @Column()
    ProfitShareHighPercentage: number;

    @Column()
    PSDescription: string;

    @Column()
    OverridePercentage: number;

    @Column()
    TargetBasis: string;

    @Column()
    TargetLowPercentage: number;

    @Column()
    TargetHighPercentage: number;

    @Column()
    TargetMinimumVolume: number;

    @Column()
    TargetMaximumVolume: number;

    @Column()
    BenefitBasis: string;

    @Column()
    BenefitLowPercentage: number;

    @Column()
    BenefitHighPercentage: number;

    @Column()
    StartDate: Date;

    @Column()
    EndDate: Date;

    @Column()
    YieldDescription: string;

    @Column()
    Year1: number;

    @Column()
    Rate1: number;

    @Column()
    Year2: number;

    @Column()
    Rate2: number;

    @Column()
    Year3: number;

    @Column()
    Rate3: number;

    @Column()
    Year4: number;

    @Column()
    Rate4: number;

    @Column()
    Year5: number;

    @Column()
    Rate5: number;

}
