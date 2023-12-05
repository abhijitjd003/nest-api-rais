import { CustomAuthGuard } from './common/auth/custom/custom-auth.guard';
import { Controller, Get, Header, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { LoggerService } from './common/services/logger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@ApiBearerAuth()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private loggerService: LoggerService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getHello(@Request() req): string {
        return this.appService.getHello();
    }

    @UseGuards(CustomAuthGuard)
    @Post('auth/validateSSO')
    @Header('Access-Control-Allow-Origin', '*')
    async validateSSO(@Request() req, @Res() response: Response) {
        return response.status(HttpStatus.OK).send(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
