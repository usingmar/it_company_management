import {
  IsArray,
  IsByteLength,
  IsDate,
  IsDefined,
  IsNumber,
  IsString,
} from 'class-validator';
import { Department } from 'src/department/department.entity';
import { Lvl } from 'src/lvl/lvl.entity';
import { Project } from 'src/project/project.entity';

export class CreateWorkerDTO {
  @IsString()
  @IsByteLength(0, 255)
  workername: string;

  @IsString()
  @IsByteLength(0, 255)
  workersurname: string;

  @IsDate()
  dateofmembership: Date;

  @IsDefined()
  @IsNumber()
  salary: number;

  @IsDefined()
  @IsArray()
  lvl: Lvl;

  @IsDefined()
  @IsArray()
  department: Department;

  @IsDefined()
  @IsArray()
  projects: Project[];
}
