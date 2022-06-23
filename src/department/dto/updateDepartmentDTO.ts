import { Type } from "class-transformer";
import { IsArray, IsByteLength,IsOptional, IsString, ValidateNested } from "class-validator";
import { Company } from "src/company/company.entity";
import { Project } from "src/project/project.entity";
import { Worker } from "src/worker/worker.entity";

export class UpdateDepartmentDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly departmentname: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    readonly departmentlocation: string;

    @IsOptional()
    @Type(() => Company)
    readonly company?: Company;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Worker)
    readonly workers?: Worker[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Project)
    readonly projects?: Project[]
}