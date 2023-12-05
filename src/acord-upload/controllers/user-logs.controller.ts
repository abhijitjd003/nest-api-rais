import { Controller, Post, Body, Put, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { UserLogsDto } from '../data-transfer-objects/user-logs.dto';
import { UserLogsService } from '../services/user-logs.service';

@ApiTags('Acord upload')
@Controller('api/v1/acord-upload/user-logs')
export class UserLogsController {
    constructor(private readonly userLogsService: UserLogsService) { }

    @Post('/new')
    create(@Body() userLogsDto: UserLogsDto) {
        return this.userLogsService.create(userLogsDto);
    }

    @Put('/update')
    update(@Body() userLogsDto: UserLogsDto) {
        return this.userLogsService.update(userLogsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/usage')
    findAll() {
        return this.userLogsService.findAll();
    }

}
