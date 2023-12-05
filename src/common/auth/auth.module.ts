import { CustomStrategy } from './custom/custom.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'src/portico-market-match/modules/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [
        AuthService,
        CustomStrategy,
        JwtStrategy,
        ConfigService,
        HttpExceptionFilter,
    ],
    exports: [AuthService, CustomStrategy],
})
export class AuthModule { }
