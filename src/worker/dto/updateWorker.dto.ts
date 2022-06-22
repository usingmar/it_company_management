import { IsByteLength, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWorkerDTO{
    @IsOptional()
    @IsString()
    @IsByteLength(1, 255)
    workername?: string;
    
    @IsOptional()
    @IsString()
    @IsByteLength(1, 255)
    workersurname?: string;

    @IsOptional()
    @IsDate()
    dateofmembership?: Date;

    @IsOptional()
    @IsNumber()
    salary?: number;

    @IsOptional()
    @IsNumber()
    lvlid?: number;

    @IsOptional()
    @IsNumber() 
    departmentid?: number;
}