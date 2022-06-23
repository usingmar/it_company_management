import { Type } from "class-transformer";
import { IsArray, IsByteLength, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Country } from "src/country/country.entity";
import { Department } from "src/department/department.entity";


export class UpdateCompanyDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly companyname?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly companytype?: string;

    @IsOptional()
    @IsNumber()
    readonly numberofworkers?: number;

    @IsOptional()
    @IsArray()
    readonly countries?: Country[]

    @IsOptional()
    @IsArray()
    readonly departments?: Department[] 
}