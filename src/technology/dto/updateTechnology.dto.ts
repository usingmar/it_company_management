import { Type } from "class-transformer";
import { IsArray, IsByteLength, IsOptional, IsString, ValidateNested } from "class-validator";
import { Project } from "src/project/project.entity";

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
    technologyname?: string;

    @IsOptional()
    @IsArray()
    readonly technologies?: Project[];
}