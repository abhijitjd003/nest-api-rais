import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DnbRequestService } from './common/services/dnb-request.service';
import { SearchService } from './portico-market-match/services/search.service';
import { UserLogsModule } from './portico-market-match/modules/user-logs.module';

@Injectable()
export class AppService {
    readonly logger = new Logger(AppService.name);
    constructor(private dnBRequest: DnbRequestService) { }


    @Cron('0 0 23 * * *')
    async refreshDnBToken() {
        this.dnBRequest.resetToken();
        this.logger.log("Empty DnB Token every day at 11:00:00 PM");
        return true;
    }

    getHello(): string {
        return 'Hello World!';
    }
}
