import { IsArray, IsDefined, IsString } from 'class-validator';
import { Worker } from '../../worker/worker.entity';

export class CreateLvlDTO {
  @IsString()
  lvlname: string;

  @IsDefined()
  @IsString()
  minexprience: string;

  @IsDefined()
  @IsArray()
  readonly workers: Worker[];
}
