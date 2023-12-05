import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogDto } from '../data-transfer-objects/user-log.dto';
import { UserLog, UserLogDocument } from '../entities/user-log.entity';

@Injectable()
export class UserLogsService {

    constructor(
        @InjectModel(UserLog.name)
        private readonly userLogModel: Model<UserLogDocument>
    ) { }

    create(userLogDto: UserLogDto): Promise<UserLog> {
        return new this.userLogModel({ ...userLogDto }).save();
    }

    findAll(page: string, type: string) {
        if (type === "non-rais") {
            return this.userLogModel.find({ user_email: { $not: /@renaissanceins.com|@Renaissanceins.com/ }, location: page + ' page' }).exec();
        } else {
            return this.userLogModel.find({ location: page + ' page' }).exec();
        }
    }

    findOne(id: string) {
        return 'This action returns a #' + id + ' userLog';
    }

    update(updateUserLogDto: UserLogDto) {
        return new this.userLogModel({ ...updateUserLogDto }).save();
    }

    remove(id: string) {
        return `This action removes a #${id} userLog`;
    }
}

