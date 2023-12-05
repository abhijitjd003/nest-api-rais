import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Headers } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../data-transfer-objects/create-user.dto';
import { UpdateUserDto } from '../data-transfer-objects/update-user.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { LoggerService } from 'src/common/services/logger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly loggerService: LoggerService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/id/:id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/email/:email')
    findOneByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getRegionByAgencyName/:agencyName')
    getRegionByAgencyName(@Param('agencyName') agencyName: string) {
        return this.usersService.getRegionByAgencyName(agencyName);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
