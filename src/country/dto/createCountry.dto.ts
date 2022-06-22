import {IsString, IsNumber, IsOptional, IsByteLength} from 'class-validator'

export class CreateCountryDTO{
    @IsString()
    @IsByteLength(1,255)
    countryname: string;
    
    @IsString()
    @IsByteLength(1,255)
    continentname: string;

    @IsOptional()
    readonly companies?: number[]
}