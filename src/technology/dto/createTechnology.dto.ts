import { IsByteLength, IsOptional, IsString } from "class-validator";

export class CreateTechnologyDTO{

    @IsOptional()
    @IsString()
    codelanguage?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1, 50)
    technologyversion?: string;

    @IsString()
    @IsByteLength(1, 100)
    technologyname: string;
}