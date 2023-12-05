import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketMatchProspectsController } from '../controllers/market-match-prospects.controller';
import { MarketMatchProspect, MarketMatchProspectSchema } from '../entities/market-match-prospects.entity';
import { MarketMatchProspectsService } from '../services/market-match-prospects.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: MarketMatchProspect.name, schema: MarketMatchProspectSchema, collection: 'market_match_prospects' }],
            'appdb',
        )
    ],
    controllers: [MarketMatchProspectsController],
    providers: [MarketMatchProspectsService],
    exports: [MongooseModule, MarketMatchProspectsService]
})
export class MarketMatchProspectsModule { }
