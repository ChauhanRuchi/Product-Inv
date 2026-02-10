import { IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  categories?: string; 

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
