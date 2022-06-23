import { Type } from "class-transformer";
import { IsArray, IsByteLength, IsDefined, IsOptional, IsString, ValidateNested } from "class-validator";
import { Project } from "src/project/project.entity";

export class CreateTechnologyDTO{

    @IsDefined()
    @IsString()
    codelanguage: string;

    @IsDefined()
    @IsString()
    @IsByteLength(1, 50)
    technologyversion: string;

    @IsString()
    @IsByteLength(1, 100)
    technologyname: string;

    @IsDefined()
    @IsArray()
    readonly technologies: Project[];
}