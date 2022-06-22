import { IsOptional, IsString } from "class-validator";

export class UpdateLvlDTO{
    @IsOptional()
    @IsString()
    lvlname?: string;
    
    @IsOptional()
    @IsString()
    minexprience?: string;
}