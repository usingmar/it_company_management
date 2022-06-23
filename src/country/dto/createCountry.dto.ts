import { Type } from 'class-transformer';
import {IsString, IsOptional, IsByteLength, IsDefined, IsArray, ValidateNested} from 'class-validator'
import { Company } from 'src/company/company.entity';

export class CreateCountryDTO{
    @IsString()
    @IsByteLength(1,255)
    readonly countryname: string;
    
    @IsString()
    @IsByteLength(1,255)
    readonly continentname: string;

    @IsDefined()
    @IsArray()
    readonly companies: Company[]
}