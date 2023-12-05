import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionMapsRequestCarrier")
export class MapsRequestCarrierEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    SubmissionId: string;

    @Column()
    LineOfBusiness: string;

    @Column()
    AgencyDatabaseID: string;

    @Column()
    Carrier: string;

    @Column()
    EffectiveDate: string;

    @Column()
    AssignedTo: string;

    @Column()
    RatingPath: string;

    @Column()
    QuotedPremium: string;

    @Column()
    Outcome: string;

    @Column()
    OutcomeDetails: string;

    @Column()
    DenialReason: string;

    @Column()
    IsBound: string;

    @Column()
    BoundPremium: string;

    @Column()
    PolNo: string;

    @Column()
    CarrierStatus: string;

    @Column()
    StartDate: string;

    @Column()
    CompletionDate: string;

    @Column()
    IsMasterCode: string;

    @Column()
    BillType: string;

    @Column()
    CreatedBy: string;

    @Column()
    CreatedDateTime: string;

    @Column()
    IsLatest: string;

}