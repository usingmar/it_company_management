import { IsOptional,IsByteLength, IsString } from "class-validator";

export class UpdateCountryDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    countryname?: string;
    
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    continentname?: string

    @IsOptional()
    readonly companies?: number[]
}