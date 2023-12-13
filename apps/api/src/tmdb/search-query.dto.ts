import { IsPositive } from 'class-validator';

export class SearchQueryDto {
  query: string;
  @IsPositive()
  page: number;
}
