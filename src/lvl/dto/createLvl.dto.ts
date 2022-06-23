import { Type } from "class-transformer";
import { IsArray, IsDefined, IsString, ValidateNested } from "class-validator";
import { Worker } from "../../worker/worker.entity"

export class CreateLvlDTO{
    @IsString()
    lvlname: string;

    @IsDefined()
    @IsString()
    minexprience: string;

    @IsDefined()
    @IsArray()
    readonly workers: Worker[];
}