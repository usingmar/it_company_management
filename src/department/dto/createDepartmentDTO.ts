import { Type } from "class-transformer";
import { IsArray, IsByteLength, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Company } from "src/company/company.entity";
import { Project } from "src/project/project.entity";
import { Worker } from "src/worker/worker.entity";

export class CreateDepartmentDTO{
    @IsString()
    @IsByteLength(1,255, {
        message: "Department name is too long, maximum 254 characters"
    })
    readonly departmentname: string;

    @IsString()
    @IsByteLength(1,255)
    readonly departmentlocation: string;

    @IsDefined()
    @Type(() => Company)
    readonly company: Company;

    @IsDefined()
    @IsArray()
    readonly workers: Worker[];

    @IsDefined()
    @IsArray()
    readonly projects: Project[]
}