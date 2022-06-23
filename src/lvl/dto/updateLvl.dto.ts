import { Type } from "class-transformer";
import { IsArray, IsDefined, IsOptional, IsString, ValidateNested } from "class-validator";
import { Worker } from "../../worker/worker.entity"

export class UpdateLvlDTO{
    @IsOptional()
    @IsString()
    lvlname?: string;
    
    @IsOptional()
    @IsString()
    minexprience?: string;

    @IsDefined()
    @IsArray()
    readonly workers?: Worker[];
}