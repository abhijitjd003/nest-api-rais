import { UsersService } from 'src/portico-market-match/services/users.service';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/portico-market-match/entities/user.entity';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user: User = await this.usersService.findOneByEmail(email);
        if (user && user.type) {
            switch (user.type) {
                case 'internal':
                    return this.verifyInternalUser(user, pass);
                case 'external':
                    return this.verifyExternalUser(email, pass);
                default:
                    break;
            }
        }
        return null;
    }

    verifyInternalUser(user: User, pass: string): Promise<any> {
        const myPromise = new Promise((resolve, reject) => {
            if (user) {
                crypto.pbkdf2(
                    pass,
                    user.passwordSalt,
                    310000,
                    32,
                    'sha256',
                    function (err, hashedPasswordBuffer) {
                        if (err) {
                            reject(null);
                        } else {
                            if (
                                crypto.timingSafeEqual(
                                    user.hashedPassword,
                                    hashedPasswordBuffer,
                                )
                            ) {
                                resolve(user.toObject());
                            } else {
                                reject(null);
                            }
                        }
                    },
                );
            } else {
                reject(null);
            }
        });
        return myPromise;
    }

    verifyExternalUser(email: string, pass: string): Promise<any> {
        // TODO: replace with renaissance auth API
        return Promise.reject(null);
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    validateSSO(token: string): any {
        let decryptedToken;
        let decodedToken;
        let sendMessage = 'token received';
        if (token === null || token === undefined || token === '') {
            sendMessage = 'no token received';
        }
        try {
            const keyString = this.configService.get<string>('auth.private_key');
            decryptedToken = this.decryptToken(token, keyString);
            const verifiedToken = this.jwtService.verify(decryptedToken, {
                secret: jwtConstants.secret,
            });
            decodedToken = this.jwtService.decode(decryptedToken);
            const returnToken = [
                { 'token': decryptedToken },
                { 'user': decodedToken }
            ];
            return returnToken;
        } catch (error) {
            error['token'] = sendMessage;
            let errorMessage = error;
            // let errorMessage = 'Invalid token';
            let statusCode = 401;
            if (error.message == 'Forbidden') {
                errorMessage = 'User does not have access to view this page';
                statusCode = 403;
            } else if (error.message === 'jwt expired') {
                errorMessage = 'Token expired';
            }
            throw this.httpException(errorMessage, statusCode);
        }
    }

    private decryptToken(combinedString: string, keyString: string) {
        const combinedData = Buffer.from(combinedString, 'base64');
        const key = Buffer.from(keyString, 'base64');
        const iv = Buffer.alloc(jwtConstants.IV_SIZE);
        const cipherText = Buffer.alloc(combinedData.length - iv.length);
        combinedData.copy(iv, 0, 0, iv.length);
        combinedData.copy(cipherText, 0, iv.length);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        // decipher.setAutoPadding(false);
        let plainText = decipher.update(cipherText, undefined, 'utf8');
        plainText += decipher.final('utf8');
        return plainText;
    }

    private httpException(errorMessage: string, statusCode: number) {
        return new HttpException(
            {
                errorMessage: errorMessage,
            },
            statusCode,
        );
    }
}
