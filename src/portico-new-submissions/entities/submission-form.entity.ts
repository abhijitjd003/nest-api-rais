import { SubmissionFormDocument } from "./submission-form-document.entity";
import { SubmissionFormLOB } from "./submission-form-lob.entity";

export class SubmissionForm {
    CarouselActiveStep: number;
    FromEmail: string;
    FromUser: string;
    ToEmail: string;
    UserFirstName: string;
    SubmissionId: string;
    AgencyDatabaseID: string;
    CustomerID: string;
    ADBIDCustomerID: string;
    FullName: string;
    DoingBusinessAs: string;
    TypeOfBusiness: string;
    SubmissionType: string;
    Addr1: string;
    City: string;
    State: string;
    ZipCode: string;
    IsNonRenewedCurrCarrier: boolean;
    IsNonRenewedCurrCarrierReason: string;
    AccountStory: string;
    IsAlreadySubmittedToCarrier: boolean;
    IsAlreadySubmittedToCarrierList: string;
    LOBList: SubmissionFormLOB;
    DocumentList: SubmissionFormDocument[];
    BypassAutomatedQueue: boolean;
}
