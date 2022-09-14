import {
  IsArray,
  IsByteLength,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Country } from 'src/country/country.entity';
import { Department } from 'src/department/department.entity';

export class UpdateCompanyDTO {
  @IsOptional()
  @IsString()
  @IsByteLength(1, 255)
  readonly companyname?: string;

  @IsOptional()
  @IsString()
  @IsByteLength(1, 255)
  readonly companytype?: string;

  @IsOptional()
  @IsNumber()
  readonly numberofworkers?: number;

  @IsOptional()
  @IsArray()
  readonly countries?: Country[];

  @IsOptional()
  @IsArray()
  readonly departments?: Department[];
}
