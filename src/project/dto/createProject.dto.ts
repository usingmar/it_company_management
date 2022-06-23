import { Type } from "class-transformer";
import { IsArray, IsByteLength, IsDefined, IsString, ValidateNested } from "class-validator";
import { Department } from "src/department/department.entity";
import { Technology } from "src/technology/technology.entity";
import { Worker } from "../../worker/worker.entity"

export class CreateProjectDTO{

    @IsString()
    @IsByteLength(1)
    scheme: string;

    @IsDefined()
    @IsString()
    @IsByteLength(1)
    stage: string;

    @IsDefined()
    department: Department;

    @IsDefined()
    @IsArray()
    readonly workers: Worker[];

    @IsDefined()
    @IsArray()
    readonly technologies: Technology[];
}