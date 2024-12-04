import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  q?: string;
}
