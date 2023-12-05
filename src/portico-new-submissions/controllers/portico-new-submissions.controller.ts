import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { PorticoNewSubmissionsService } from '../services/portico-new-submissions.service';
import { LinesOfBusinessService } from '../services/lines-of-business.service';

@ApiTags('Portico New Submissions')
@ApiBearerAuth()
@Controller('api/v1/portico-new-submissions')
export class PorticoNewSubmissionsController {

    constructor(private readonly porticoNewSubmissionsService: PorticoNewSubmissionsService, private linesOfBusinessService: LinesOfBusinessService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/document-type/all')
    findAll() {
        return this.porticoNewSubmissionsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lines-of-business/all')
    getAllLOBs() {
        return this.linesOfBusinessService.getAllLOBs();
    }

}
