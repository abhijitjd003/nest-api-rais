import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserLogsDocument = UserLogs & mongoose.Document;

@Schema({ timestamps: true })
export class UserLogs extends mongoose.Document {
    @Prop({ type: String })
    agency: string;

    @Prop({ type: String })
    region: string;

    @Prop({ type: String })
    session_id: string;

    @Prop({ type: String })
    datetime: string;

    @Prop({ type: String })
    user_name: string;

    @Prop({ type: String })
    user_email: string;

    @Prop({ type: Boolean })
    file_upload_page_loaded?: boolean;

    @Prop({ type: Boolean })
    file_uploaded?: boolean;

    @Prop({ type: Boolean })
    azure_data_returned?: boolean;

    @Prop({ type: Boolean })
    agency_info_loaded?: boolean;

    @Prop({ type: Boolean })
    applicant_info_loaded?: boolean;

    @Prop({ type: Boolean })
    premises_info_loaded?: boolean;

    @Prop({ type: Boolean })
    business_nature_loaded?: boolean;

    @Prop({ type: Boolean })
    additional_info_loaded?: boolean;

    @Prop({ type: Boolean })
    claims_and_losses_info_loaded?: boolean;

    @Prop({ type: Boolean })
    summary_page_loaded?: boolean;

    @Prop({ type: Boolean })
    summary_form_downloaded?: boolean;

}

export const UserLogsSchema = SchemaFactory.createForClass(UserLogs);
UserLogsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
function removeInternals(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}

UserLogsSchema.set('toJSON', {
    virtuals: true,
    transform: removeInternals,
});

UserLogsSchema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: removeInternals,
});
