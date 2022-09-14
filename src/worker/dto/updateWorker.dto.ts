import {
  IsArray,
  IsByteLength,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Department } from 'src/department/department.entity';
import { Lvl } from 'src/lvl/lvl.entity';
import { Project } from 'src/project/project.entity';

export class UpdateWorkerDTO {
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
  @IsArray()
  lvl?: Lvl;

  @IsOptional()
  @IsArray()
  department?: Department;

  @IsOptional()
  @IsArray()
  projects?: Project[];
}
