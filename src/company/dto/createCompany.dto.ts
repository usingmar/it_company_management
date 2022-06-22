import {IsString, IsNumber, IsOptional, IsByteLength, IsDefined} from 'class-validator'
import { Country } from 'src/country/country.entity';


export class CreateCompanyDTO{
    @IsDefined()
    @IsString()
    @IsByteLength(1,255)
    readonly companyname: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly companytype?: string;

    @IsOptional()
    @IsNumber()
    readonly numberofworkers?: number;

    @IsOptional()
    readonly countries?: number[]
}