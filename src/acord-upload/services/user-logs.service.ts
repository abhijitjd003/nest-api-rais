import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserLogsDto } from '../data-transfer-objects/user-logs.dto';
import { UserLogs, UserLogsDocument } from '../entities/user-logs.entity';

@Injectable()
export class UserLogsService {

    constructor(
        @InjectModel(UserLogs.name)
        private readonly userLogsDocument: Model<UserLogsDocument>
    ) { }

    create(userLogsDto: UserLogsDto): Promise<UserLogs> {
        return new this.userLogsDocument({ ...userLogsDto }).save();
    }

    update(userLogsDto: UserLogsDto): Promise<void | UserLogs> {
        return this.userLogsDocument.updateOne({ _id: userLogsDto.session_id }, { $set: { ...userLogsDto } }).then((response) => {
            console.log(response);
        });
    }

    findAll() {
        return this.userLogsDocument.find({}).exec();
    }
}

