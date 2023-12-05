import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Blob } from 'buffer';
import * as mongoose from 'mongoose';
import { Any } from 'typeorm';

export class AcordUpload {
    @Prop({ type: Blob })
    document: Blob;

}
