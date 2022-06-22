import { IsOptional, IsString } from "class-validator";

export class CreateLvlDTO{
    @IsString()
    lvlname: string;

    @IsOptional()
    @IsString()
    minexprience?: string;
}