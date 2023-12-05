import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UseFilters } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class CustomStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(req: any): Promise<any> {
        const extractedToken = req.body.token;
        const verifiedToken = this.authService.validateSSO(extractedToken);
        if (!verifiedToken) {
            return false;
        }
        return { user: verifiedToken };
    }
}
