import { Logger } from "@nestjs/common";

export class LogDto {
    Timestamp?: string = '';
    logLevel: number;
    StackTrace?: string = '';
    Environmentname?: string = '';
    Email?: string = '';
    Message?: string = '';
    ApplicationName?: string = '';
    Additional?: string[];
    UserAgency?: string = '';
    FileName?: string = '';
    SessionId?: string = '';
}


export interface LogApiTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}
