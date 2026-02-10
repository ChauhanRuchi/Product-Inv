import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  quantity: number;

  @IsArray()
  categories: number[];
}
