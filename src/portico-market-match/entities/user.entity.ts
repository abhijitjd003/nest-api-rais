import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User extends mongoose.Document {
    @Prop({ type: String, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    type: string | 'external' | 'internal';

    @Prop({ type: Buffer })
    passwordSalt: Buffer;

    @Prop({ type: Buffer })
    hashedPassword: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

function removeInternals(doc, ret, options) {
    // ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordSalt;
    delete ret.hashedPassword;
    return ret;
}

UserSchema.set('toJSON', {
    virtuals: true,
    transform: removeInternals,
});

UserSchema.set('toObject', {
    getters: true,
    virtuals: true,
    transform: removeInternals,
});
