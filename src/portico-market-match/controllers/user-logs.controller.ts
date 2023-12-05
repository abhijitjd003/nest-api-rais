import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserLogsService } from '../services/user-logs.service';
import { UserLogDto } from '../data-transfer-objects/user-log.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';

@ApiTags('User Logs')
@ApiBearerAuth()
@Controller('api/v1/marketmatch/logs')
export class UserLogsController {
    constructor(private readonly userLogsService: UserLogsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/new')
    create(@Body() createUserLogDto: UserLogDto) {
        return this.userLogsService.create(createUserLogDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/bulk/reports/:page/:type')
    findAll(
        @Param('page') page: string,
        @Param('type') type: string
    ) {
        return this.userLogsService.findAll(page, type);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userLogsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    update(@Body() updateUserLogDto: UserLogDto) {
        return this.userLogsService.update(updateUserLogDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userLogsService.remove(id);
    }

}
