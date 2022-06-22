import { IsByteLength, IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWorkerDTO{
    @IsString()
    @IsByteLength(0, 255)
    workername: string;
    
    @IsString()
    @IsByteLength(0, 255)
    workersurname: string;

    @IsDate()
    dateofmembership: Date;

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