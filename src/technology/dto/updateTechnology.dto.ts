import { IsByteLength, IsOptional, IsString } from "class-validator";

export class UpdateTechnologyDTO{

    @IsOptional()
    @IsString()
    codelanguage?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1, 50)
    technologyversion?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1, 100)
    technologyname: string;
}