import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserLogDocument = UserLog & mongoose.Document;

@Schema({ timestamps: true })
export class UserLog extends mongoose.Document {
    @Prop({ type: String })
    session_log_id: string;

    @Prop({ type: String })
    session_start_datetime: string;

    @Prop({ type: String })
    user_id: string;

    @Prop({ type: String })
    user_email: string;

    @Prop({ type: {} })
    agency: any;

    @Prop({ type: String })
    datetime: string;

    @Prop({ type: String })
    event: string;

    @Prop({ type: String })
    location: string;

    @Prop({ type: String })
    search_value: string;

    @Prop({ type: String })
    selected: string;

    @Prop({ type: String })
    naics: string;

    @Prop({ type: String })
    state_filter: string;

    @Prop({ type: String })
    lob_filters: string;

    @Prop({ type: String })
    data: string;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
UserLogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
function removeInternals(doc, ret, options) {
    // ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}

UserLogSchema.set('toJSON', {
    virtuals: true,
    transform: removeInternals,
});

UserLogSchema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: removeInternals,
});
