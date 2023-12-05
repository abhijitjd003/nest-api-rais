import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("Submissions.dbo.SubmissionMapsRequestLOB")
export class MapsRequestLobEntity {
    @PrimaryGeneratedColumn()
    ID: string;

    @Column()
    SubmissionId: string;

    @Column()
    AgencyDatabaseID: string;

    @Column()
    LineOfBusiness: string;

    @Column()
    EffectiveDate: string;

    @Column()
    TargetDate: string;

    @Column()
    TargetPremium: string;

    @Column()
    CreatedBy: string;

    @Column()
    CreatedDateTime: string;

    @Column()
    IsLatest: boolean;

    @Column()
    IsSendToRater: boolean;

}