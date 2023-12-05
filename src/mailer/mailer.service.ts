import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { UserInfoDto } from "./data-transfer-objects/user-info.dto";

@Injectable()
export class MailerService {
    constructor(private nestMailerService: NestMailerService, private configService: ConfigService) { }


    public async sendRequestEmail(userInfo: UserInfoDto, userEmail: string){
        try{
            await this.nestMailerService.sendMail(
                {
                    from: this.configService.get<string>('automated_email.request_access.sender'),
                    to: this.configService.get<string>('automated_email.request_access.recipient'),
                    subject: this.configService.get<string>('automated_email.request_access.subject'),
                    template: 'request-access',
                    context: {
                     user: userInfo
                    }
                 }
            )
        }
        catch (exception) {
            throw exception;
        }
        
    }
}