import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../data-transfer-objects/create-user.dto';
import { UpdateUserDto } from '../data-transfer-objects/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import * as crypto from "crypto";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyConfigurationEntity } from 'src/insured-premium-payment/entities/agency-configuration.entity';

@Injectable()
export class UsersService {


    @InjectModel(User.name) private readonly userModel: Model<UserDocument>;

    constructor(
        @InjectRepository(AgencyConfigurationEntity)
        private agencyConfigRepository: Repository<AgencyConfigurationEntity>) {
    }

    async generateHashedPassword(password: string): Promise<any> {
        const passwordSaltBuffer = crypto.randomBytes(16);
        const myPromise = new Promise((resolve, reject) => {
            crypto.pbkdf2(password, passwordSaltBuffer, 310000, 32, 'sha256', function (err, hashedPasswordBuffer) {
                if (err) {
                    reject(null);
                }
                else {
                    resolve({ passwordSaltBuffer, hashedPasswordBuffer });
                }
            });
        });
        return myPromise;
    }

    async create(createUserDto: CreateUserDto): Promise<User | undefined> {
        const { passwordSaltBuffer, hashedPasswordBuffer } = await this.generateHashedPassword(createUserDto.password);

        if (passwordSaltBuffer == null || hashedPasswordBuffer == null) {
            return null;
        }

        const userObject = {
            passwordSalt: passwordSaltBuffer,
            hashedPassword: hashedPasswordBuffer,
            email: createUserDto.email,
            type: createUserDto.type
        };

        //const newUser = await new this.userModel(userObject);
        return;// newUser.save();
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    findOneByEmail(email: string): Promise<User | undefined> {
        const existingUser = this.userModel.findOne({ email }).exec();
        return existingUser;
    }

    async getRegionByAgencyName(agencyName: string) {
        let queryResult;
        if (agencyName) {
            let sql = `SELECT Region
                FROM [RAISDataModel].[dbo].[dimAgencyConfiguration]
                WHERE LongName = '${agencyName}'`;
            await this.agencyConfigRepository.query(sql)
                .then(res => {
                    queryResult = res;
                })
                .catch((exception) => {
                    throw exception;
                });
        }
        return queryResult;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
