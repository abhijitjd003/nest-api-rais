import { Controller, Post, Body, Put, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { MarketMatchProspectsDto } from '../data-transfer-objects/market-match-prospects.dto';
import { MarketMatchProspectsService } from '../services/market-match-prospects.service';

@ApiTags('Market Match Prospects')
@Controller('api/v1/marketmatchprospects')
export class MarketMatchProspectsController {
    constructor(private readonly marketMatchProspectsService: MarketMatchProspectsService) { }

    @Post('/new')
    create(@Body() marketMatchProspectsDto: MarketMatchProspectsDto) {
        return this.marketMatchProspectsService.create(marketMatchProspectsDto);
    }

    @Put('/update')
    update(@Body() marketMatchProspectsDto: MarketMatchProspectsDto) {
        return this.marketMatchProspectsService.update(marketMatchProspectsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/usage')
    findAll() {
        return this.marketMatchProspectsService.findAll();
    }

}
