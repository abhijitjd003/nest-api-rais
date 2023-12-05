class SubmissionFormLOBItem {
    LineOfBusiness: string;
    EffectiveDate: Date;
    TargetDate: Date;
    TargetPremium: number;
    IsSendToRater: boolean;
}

export class SubmissionFormLOB {
    Items: SubmissionFormLOBItem[];
}
