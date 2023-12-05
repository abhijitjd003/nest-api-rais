import { Controller, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { Body, Get, Post, Put, Param, Query, Req, UploadedFile } from '@nestjs/common/decorators';
import { LoggerService } from 'src/common/services/logger.service';
import { ErrorhelperService } from 'src/common/services/error-helper.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/jwt/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MapsUploadService } from '../services/submission-maps-upload.service';
import MapsFilesInterceptor from '../services/submission-maps-files.interceptor';
import { DocumentTypeService } from '../services/document-type.service';
import { LinesOfBusinessService } from '../services/lines-of-business.service';
import { CarrierListService } from '../services/carrier-list.service';
import { UserListService } from '../services/user-list.service';
import { MapsDocumentListService } from '../services/submission-maps-document-list.service';
import { MapsDocumentService } from '../services/submission-maps-document.service';
import { MapsLobCarrierListService } from '../services/submission-lob-carrier-list.service';
import { MapsRequestService } from '../services/submission-maps-request.service';
import { MapsRequestLobService } from '../services/submission-maps-request-lob.service';
import { MapsRequestCarrierService } from '../services/submission-maps-request-carrier.service';
import { MapsRequestCarrierNoteService } from '../services/submission-maps-request-carrier-note.service';
import { MapsRequestActionListService } from '../services/submission-request-action-list.service';
import { MapsOpenCarrierListService } from '../services/submission-open-carrier-list.service';
import { MapsUnassignedSubListService } from '../services/submission-unassigned-sub-list.service';
import { MapsDocumentDto } from '../data-transfer-objects/maps-document.dto';
import { MapsRequestDto } from '../data-transfer-objects/maps-request.dto';
import { MapsRequestCarrierNoteDto } from '../data-transfer-objects/maps-request-carrier-note.dto';
import { MapsRequestLobDto } from '../data-transfer-objects/maps-request-lob.dto';
import { MapsRequestCarrierDto } from '../data-transfer-objects/maps-request-carrier.dto';
import { MapsDocumentEntity } from '../entities/submission-maps-document.entity';
import { MapsRequestLobEntity } from '../entities/submission-maps-request-lob.entity';
import { MapsRequestCarrierEntity } from '../entities/submission-maps-request-carrier.entity';
import { MapsOpenCarrierListEntity } from '../entities/submission-open_carrier-list.entity';
import { MapsUnassignedSubListEntity } from '../entities/submission-unassigned-sub-list.entity';

@ApiTags('Placement')
@ApiBearerAuth()
@Controller('api/v1/placement')
export class PlacementController {

    constructor(
        private documentTypeService: DocumentTypeService,
        private linesOfBusinessService: LinesOfBusinessService,
        private carrierListService: CarrierListService,
        private userListService: UserListService,
        private readonly mapsUploadService: MapsUploadService,
        private mapsDocumentListService: MapsDocumentListService,
        private mapsDocumentService: MapsDocumentService,
        private mapsLobCarrierListService: MapsLobCarrierListService,
        private mapsRequestService: MapsRequestService,
        private mapsRequestLobService: MapsRequestLobService,
        private mapsRequestCarrierService: MapsRequestCarrierService,
        private mapsRequestCarrierNoteService: MapsRequestCarrierNoteService,
        private mapsRequestActionListService: MapsRequestActionListService,
        private mapsOpenCarrierListService: MapsOpenCarrierListService,
        private mapsUnassignedSubListService: MapsUnassignedSubListService,
        private errorhelperService: ErrorhelperService,
        private loggerService: LoggerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('/document-type/all')
    getAllDocumentTypes() {
        return this.documentTypeService.getAllDocumentTypes();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/lines-of-business/all')
    getAllLOBs() {
        return this.linesOfBusinessService.getAllLOBs();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/carrier-list/all')
    getAllCarriers() {
        return this.carrierListService.getAllCarriers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user-list/find-by')
    async getUserList(@Query('usertype') usertype: string) {
        return this.userListService.getUserList(usertype);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/upload-maps-docs/:submissionid/:filenames')
    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(MapsFilesInterceptor({ fieldName: 'files', path: '/' }))
    async save(@Req() request, @UploadedFile() files: Array<Express.Multer.File>, @Param('submissionid') submissionId: string) {
        const uploadedFiles = request.files;
        const documents = this.mapsUploadService.uploadMapsSubmissionDocs(uploadedFiles, submissionId);
        return documents;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-lob-carrier-list/find-by')
    async getMapsLobCarrierList(@Query('submissionid') submissionid: string) {
        return this.mapsLobCarrierListService.getMapsLobCarrierList(submissionid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-doc-list/find-by')
    @ApiQuery({ name: 'lineofbusiness', required: false, type: String })
    @ApiQuery({ name: 'carrier', required: false, type: String })
    async getMapsDocumentList(@Query('submissionid') submissionid: string, @Query('lineofbusiness') lineofbusiness?: string, @Query('carrier') carrier?: string) {
        return this.mapsDocumentListService.getMapsDocumentList(submissionid, lineofbusiness, carrier);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/submission-maps-doc/new')
    async createMapsDocument(@Body() mapsDocumentDto: MapsDocumentDto) {
        return this.mapsDocumentService.createMapsDocument(mapsDocumentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/submission-maps-doc/update/:id')
    async updateMapsDocument(@Param('id') id: string, @Body() mapsDocumentEntity: MapsDocumentEntity): Promise<any> {
        return this.mapsDocumentService.updateMapsDocument(id, mapsDocumentEntity);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-request/find-by')
    async getMapsRequestDetails(@Query('submissionid') submissionid: string) {
        return this.mapsRequestService.getMapsRequestDetails(submissionid);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/submission-maps-request/new')
    async createMapsRequest(@Body() mapsRequestDto: MapsRequestDto) {
        return this.mapsRequestService.createMapsRequest(mapsRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/submission-maps-request-islatest/update/:submissionid')
    async updateMapsRequestIsLatest(@Param('submissionid') submissionid: string): Promise<any> {
        return this.mapsRequestService.updateMapsRequestIsLatest(submissionid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-request-action-list/find-by')
    async MapsRequestActionListService(@Query('submissionid') submissionid: string) {
        return this.mapsRequestActionListService.getMapsRequestActionList(submissionid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-request-lob/find-by')
    async getMapsRequestLobDetails(@Query('submissionid') submissionid: string, @Query('lineofbusiness') lineofbusiness: string) {
        return this.mapsRequestLobService.getMapsRequestLobDetails(submissionid, lineofbusiness);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/submission-maps-request-lob/new')
    async createMapsRequestLob(@Body() mapsRequestLobDto: MapsRequestLobDto) {
        return this.mapsRequestLobService.createMapsRequestLob(mapsRequestLobDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/submission-maps-request-lob/update/:id')
    async updateMapsRequestLob(@Param('id') id: string, @Body() mapsRequestLob: MapsRequestLobEntity): Promise<any> {
        return this.mapsRequestLobService.updateMapsRequestLob(id, mapsRequestLob);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-request-carrier/find-by')
    async getMapsRequestCarrierDetails(@Query('submissionid') submissionid: string, @Query('lineofbusiness') lineofbusiness: string, @Query('carrier') carrier: string) {
        return this.mapsRequestCarrierService.getMapsRequestCarrierDetails(submissionid, lineofbusiness, carrier);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/submission-maps-request-carrier/new')
    async createMapsRequestCarrier(@Body() mapsRequestCarrierDto: MapsRequestCarrierDto) {
        return this.mapsRequestCarrierService.createMapsRequestCarrier(mapsRequestCarrierDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/submission-maps-request-carrier/update/:id')
    async updateMapsRequestCarrier(@Param('id') id: string, @Body() mapsRequestCarrier: MapsRequestCarrierEntity): Promise<any> {
        return this.mapsRequestCarrierService.updateMapsRequestCarrier(id, mapsRequestCarrier);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-request-carrier-note/find-by')
    async getMapsRequestCarrierNoteDetails(@Query('submissionid') submissionid: string, @Query('lineofbusiness') lineofbusiness: string, @Query('carrier') carrier: string) {
        return this.mapsRequestCarrierNoteService.getMapsRequestCarrierNoteDetails(submissionid, lineofbusiness, carrier);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/submission-maps-request-carrier-note/new')
    createMapsRequestCarrierNote(@Body() mapsRequestCarrierNoteDto: MapsRequestCarrierNoteDto) {
        return this.mapsRequestCarrierNoteService.createMapsRequestCarrierNote(mapsRequestCarrierNoteDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-open-carrier-list/all')
    async getMapsOpenCarrierList() {
        return this.mapsOpenCarrierListService.getMapsOpenCarrierList();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/submission-maps-unassigned_sub-list/all')
    async getMapsUnassignedSubList() {
        return this.mapsUnassignedSubListService.getMapsUnassignedSubList();
    }
}
