import { IsByteLength, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDTO{
    @IsString()
    @IsByteLength(1,255, {
        message: "Department name is too long, maximum 254 characters"
    })
    departmentname: string;

    @IsString()
    @IsByteLength(1,255)
    departmentlocation: string;

    @IsOptional()
    @IsNumber()
    companyid?: number;
}