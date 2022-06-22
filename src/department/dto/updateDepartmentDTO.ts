import { IsByteLength, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    departmentname: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1,255)
    departmentlocation: string;

    @IsOptional()
    @IsNumber()
    companyid?: number;
}