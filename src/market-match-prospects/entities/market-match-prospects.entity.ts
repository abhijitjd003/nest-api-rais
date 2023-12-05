import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type MarketMatchProspectsDocument = MarketMatchProspect & mongoose.Document;

@Schema({ timestamps: true })
export class MarketMatchProspect extends mongoose.Document {
    @Prop({ type: String })
    session_id: string;

    @Prop({ type: String })
    datetime: string;

    @Prop({ type: String })
    prospect_name: string;

    @Prop({ type: String })
    prospect_agency: string;

    @Prop({ type: String })
    prospect_email: string;

    @Prop({ type: String })
    premium_range: string;

    @Prop({ type: String })
    prospect_role: string;

    @Prop({ type: String })
    agency_state: string;

    @Prop({ type: String })
    first_page?: string;

    @Prop({ type: Boolean })
    form_loaded?: boolean;

    @Prop({ type: Boolean })
    form_submitted?: boolean;

    @Prop({ type: Boolean })
    video_loaded?: boolean;

    @Prop({ type: Boolean })
    video_played?: boolean;
}

export const MarketMatchProspectSchema = SchemaFactory.createForClass(MarketMatchProspect);
MarketMatchProspectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
function removeInternals(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}

MarketMatchProspectSchema.set('toJSON', {
    virtuals: true,
    transform: removeInternals,
});

MarketMatchProspectSchema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: removeInternals,
});
