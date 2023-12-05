import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { HubspotService } from "./hubspot.service";
import { ApiTags } from "@nestjs/swagger";
import { MarketMatchProspectsDto } from "src/market-match-prospects/data-transfer-objects/market-match-prospects.dto";


@ApiTags('Hubspot')
@Controller('api/v1/marketmatchprospects')
export class HubspotController {
    constructor(private hubspotService: HubspotService) { }

    @Post('/hubspot-integration')
    async sendDataToHubspot(@Body() data: MarketMatchProspectsDto) {
        return this.hubspotService.sendDataToHubspot(data);
    }

}
