import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogsService } from '../services/user-logs.service';
import { Repository } from 'typeorm';
import { GetCacheable, PutCacheable } from 'src/common/decorators/cacheable.decorator';
import { SearchDetailDto } from '../data-transfer-objects/search-detail.dto';
import { SearchEntity } from '../entities/search.entity';

const FindAllTopFiveRecord =
    'SELECT TOP (5) * FROM RAISDataModel.dbo.vDimDUNSForPortico';

const SearchRecordsAndReturnTopFive = `SELECT TOP (5) NAICSDescrPriority1, NAICSCodePriority1, SortName,  FullAddress, DoingBusinessAs,
ADBIDCustomerID, State FROM RAISDataModel.dbo.vDimDUNSForPortico
 WHERE SortName LIKE '%?%' OR FullAddress LIKE '%?%'`;

@Injectable()
export class SearchService {
    static PREFIX_CACHE_KEY = 'DB_CACHE';
    readonly logger = new Logger(SearchService.name);
    constructor(
        @InjectRepository(SearchEntity)
        private filtersRepository: Repository<SearchEntity>,
        private userLogsService: UserLogsService,
        private configService: ConfigService, // This injection is used in cacheable, so please do not remove it
    ) { }

    findAll(): Promise<SearchEntity[]> {
        return this.filtersRepository.query(FindAllTopFiveRecord);
    }

    // this method should be use with crone

    @PutCacheable(null, SearchService.PREFIX_CACHE_KEY)
    async addDataIntoCache(): Promise<SearchEntity[]> {
        let sql = `SELECT NAICSDescrPriority1, NAICSCodePriority1,NAICSCodePriority2,NAICSDescrPriority2, SortName, FullAddress,TRIM(LOWER(SortName)) as LowerSortName,TRIM(LOWER(FullAddress)) as LowerFullAddress, DoingBusinessAs, ADBIDCustomerID,NAICSLongDescrPriority2, NAICSLongDescrPriority1, State FROM RAISDataModel.dbo.vDimDUNSForPortico`;
        let queryResult = await this.filtersRepository.query(sql);
        return queryResult;
    }

    // @GetCacheable(null, SearchService.PREFIX_CACHE_KEY, 5)
    async searchRecords(searchString: string): Promise<SearchEntity[]> {
        return this.searchRecordsDB(searchString);
    }

    async searchRecordsDB(searchString: string): Promise<SearchEntity[]> {
        if (searchString) {
            searchString = searchString.trim().replaceAll("'", "''");
        }

        let sql = `SELECT TOP (5) NAICSDescrPriority1, NAICSCodePriority1,NAICSCodePriority2,NAICSDescrPriority2, TRIM(SortName) as SortName, TRIM(FullAddress) as FullAddress, DoingBusinessAs, ADBIDCustomerID,NAICSLongDescrPriority2, NAICSLongDescrPriority1, State FROM RAISDataModel.dbo.vDimDUNSForPortico
     WHERE SortName LIKE '%${searchString}%' OR FullAddress LIKE '%${searchString}%'`;

        let queryResult = await this.filtersRepository.query(sql);

        return queryResult;
    }

    async searchDetailRecords(searchDetailDto: SearchDetailDto) {
        let searchRes = searchDetailDto.search;
        let logRes = searchDetailDto.log;
        let queryResult;
        if (searchRes) {
            let sql = `SELECT TOP (5)  NAICSDescrPriority1, NAICSCodePriority1,NAICSCodePriority2,NAICSDescrPriority2, SortName,  FullAddress, DoingBusinessAs, ADBIDCustomerID,NAICSLongDescrPriority2, NAICSLongDescrPriority1, State FROM RAISDataModel.dbo.vDimDUNSForPortico WHERE NAICSCodePriority1 LIKE '%${searchRes}%'`;
            queryResult = await this.filtersRepository.query(sql);
        }
        if (logRes) {
            let logsSaved = await this.userLogsService.create(logRes);
            if (!logsSaved) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        }
        return queryResult;
    }

    async searchByDescription(searchValue: string) {
        searchValue = searchValue.length > 0 ? searchValue : '114722725';

        let sql = `SELECT DISTINCT Code, Title, Description FROM RAISDataModel.dbo.dimNaics
            WHERE Code LIKE '%${searchValue}%' OR
            Title LIKE '%${searchValue}%' OR
            IndexItemDescription LIKE '%${searchValue}%' OR
            Description LIKE '%${searchValue}%'`;

        let queryResult = await this.filtersRepository.query(sql);
        return queryResult;
    }
}
