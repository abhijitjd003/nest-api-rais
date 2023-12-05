import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionMapsRequest")
export class MapsRequestEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    AgencyDatabaseID: string;

    @Column()
    Region: string;

    @Column()
    SubmissionId: string;

    @Column()
    AQApplicationId: string;

    @Column()
    AQApplicationUrl: string;

    @Column()
    CustomerID: string;

    @Column()
    ADBIDCustomerID: string;

    @Column()
    FullName: string;

    @Column()
    DoingBusinessAs: string;

    @Column()
    Addr1: string;

    @Column()
    Addr2: string;

    @Column()
    City: string;

    @Column()
    State: string;

    @Column()
    ZipCode: string;

    @Column()
    TypeOfBusiness: string;

    @Column()
    SubmissionType: string;

    @Column()
    TargetDate: Date;

    @Column()
    RequestType: string;

    @Column()
    RequestTrack: string;

    @Column()
    AssignedTo: string;

    @Column()
    NAICSCode: string;

    @Column()
    NAICSDescription: string;

    @Column()
    SICCode: string;

    @Column()
    SICDescription: string;

    @Column()
    RequestStatus: string;

    @Column()
    IsNonRenewedCurrCarrier: boolean;

    @Column()
    IsNonRenewedCurrCarrierReason: string;

    @Column()
    AccountStory: string;

    @Column()
    IsAlreadySubmittedToCarrier: boolean;

    @Column()
    IsAlreadySubmittedToCarrierList: string;

    @Column()
    InformationCompleteDate: string;

    @Column()
    IsClosed: boolean;

    @Column()
    CreatedBy: string;

    @Column()
    CreatedDateTime: Date;

    @Column()
    IsLatest: boolean;

}
