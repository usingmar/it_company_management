import { IsByteLength, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProjectDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1)
    scheme?: string;

    @IsOptional()
    @IsString()
    @IsByteLength(1)
    stage?: string;

    @IsOptional()
    @IsNumber()
    departmentid?: number;
}