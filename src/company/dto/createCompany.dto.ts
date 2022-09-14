import {
  IsString,
  IsNumber,
  IsByteLength,
  IsDefined,
  IsArray,
} from 'class-validator';
import { Country } from 'src/country/country.entity';
import { Department } from 'src/department/department.entity';

export class CreateCompanyDTO {
  @IsDefined()
  @IsString()
  @IsByteLength(1, 255)
  readonly companyname: string;

  @IsDefined()
  @IsString()
  @IsByteLength(1, 255)
  readonly companytype: string;

  @IsDefined()
  @IsNumber()
  readonly numberofworkers: number;

  @IsDefined()
  @IsArray()
  countries: Country[];

  @IsDefined()
  @IsArray()
  departments: Department[];
}
