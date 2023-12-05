import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { LoggerService } from "src/common/services/logger.service";
import { UserInfoDto } from "./data-transfer-objects/user-info.dto";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "src/common/auth/jwt/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Request Access')
@ApiBearerAuth()
@Controller()
export class MailerController {
    constructor(private mailerService: MailerService, private loggerService: LoggerService, private configService: ConfigService) { }

    @UseGuards(JwtAuthGuard)
    @Post('request-mail')
    async sendRequestEmail(@Req() req, @Body() userInfo: UserInfoDto) {
        try {
            const logMessage = `Request access email sent to ${this.configService.get<string>('automated_email.request_access.recipient')}`;
            await this.mailerService.sendRequestEmail(userInfo, req.user.email);
            this.loggerService.info(MailerController.name, logMessage, userInfo, req.user.email, req.headers.sessionid);
        }
        catch (error) {
            this.loggerService.error(MailerController.name, error.message, error, req.user.userEmail, req.headers.sessionid, 'sendRequestEmail');
        }
    }

}
