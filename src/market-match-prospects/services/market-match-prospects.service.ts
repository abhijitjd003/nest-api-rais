import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MarketMatchProspectsDto } from '../data-transfer-objects/market-match-prospects.dto';
import { MarketMatchProspect, MarketMatchProspectsDocument } from '../entities/market-match-prospects.entity';

@Injectable()
export class MarketMatchProspectsService {

    constructor(
        @InjectModel(MarketMatchProspect.name)
        private readonly marketMatchProspectDocument: Model<MarketMatchProspectsDocument>
    ) { }

    create(marketMatchProspectDto: MarketMatchProspectsDto): Promise<MarketMatchProspect> {
        return new this.marketMatchProspectDocument({ ...marketMatchProspectDto }).save();
    }

    update(marketMatchProspectDto: MarketMatchProspectsDto): Promise<void | MarketMatchProspect> {
        return this.marketMatchProspectDocument.updateOne({ _id: marketMatchProspectDto.session_id }, { $set: { ...marketMatchProspectDto } }).then((response) => {
            console.log(response);
        });
    }

    findAll() {
        return this.marketMatchProspectDocument.find({}).exec();
    }
}

