import { Injectable } from '@nestjs/common';
import { exit } from 'process';

@Injectable()
export class ErrorhelperService {
    commonResponse(result: any) {
        let data = {};
        if (result.length > 0) {
            data = {
                data: result,
                status: 200,
                message: 'Data found successfully',
            };
        } else {
            data = {
                data: [],
                status: 200,
                message: 'Data not found',
            };
        }

        return result;
    }
    queryTimeOutResponse(error: any) {
        let data = {
            data: error.code,
            status: 504,
            message: 'Query timed out',
        };

        return data;
    }
}
