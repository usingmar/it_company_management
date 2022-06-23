import { Type } from "class-transformer";
import { IsOptional,IsByteLength, IsString, IsArray, ValidateNested } from "class-validator";
import { Company } from "src/company/company.entity";

export class UpdateCountryDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly countryname?: string;
    
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly continentname?: string

    @IsOptional()
    @IsArray()
    readonly companies?: Company[]
}