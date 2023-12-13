import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  page: number;
}
