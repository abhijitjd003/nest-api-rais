import { PartialType } from '@nestjs/mapped-types';
import { UserLogDto } from './user-log.dto';

export class UpdateUserLogDto extends PartialType(UserLogDto) { }
