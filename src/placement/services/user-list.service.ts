import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserListEntity } from '../entities/user-list.entity';

@Injectable()
export class UserListService {
    constructor(
        @InjectRepository(UserListEntity)
        private userListRepository: Repository<UserListEntity>,
    ) { }

    async getUserList(usertype: string) {
        let queryResult;
        if (usertype) {
            await this.userListRepository.find({
                where: {
                    UserStatus: "Active",
                    UserType: usertype
                },
                order: {
                    UserName: "ASC"
                }
            })
                .then(res => {
                    queryResult = res;
                })
                .catch((exception) => {
                    throw exception;
                });
        }
        else {
            await this.userListRepository.find({
                where: {
                    UserStatus: "Active"
                },
                order: {
                    UserName: "ASC"
                }
            })
                .then(res => {
                    queryResult = res;
                })
                .catch((exception) => {
                    throw exception;
                });
        }
        return queryResult;
    }
}

