import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDTO } from './dto/createDepartmentDTO';
import { UpdateDepartmentDTO } from './dto/updateDepartmentDTO';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find({
      relations: { company: true, workers: true, projects: true },
    });
  }

  async findItem(_id: number): Promise<Department> {
    return await this.departmentRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { company: true, workers: true, projects: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such department',
          },
          400,
        );
      });
  }

  async remove(_id: number): Promise<Department> {
    let deleteAim: Department;
    await this.departmentRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { company: true, workers: true, projects: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such department',
          },
          400,
        );
      })
      .then((data) => {
        deleteAim = data;
        this.departmentRepository.delete(_id);
      });
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateDepartmentDTO): Promise<Department> {
    checkNumberOfProperties(DTO);
    const original = await this.departmentRepository.findOne({
      where: { id: _id },
      relations: { company: true, workers: true, projects: true },
    });
    if (original) {
      await this.departmentRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.departmentRepository.findOne({
      where: { id: _id },
      relations: { company: true, workers: true, projects: true },
    });
    return updated;
  }

  async put(_id: number, DTO: CreateDepartmentDTO): Promise<Department> {
    checkNumberOfProperties(DTO);
    const original = await this.departmentRepository.findOne({
      where: { id: _id },
      relations: { company: true, workers: true, projects: true },
    });
    if (original) {
      await this.departmentRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.departmentRepository.findOne({
      where: { id: _id },
      relations: { company: true, workers: true, projects: true },
    });
    return updated;
  }

  async create(DTO: CreateDepartmentDTO): Promise<void> {
    await this.departmentRepository.save(DTO);
  }
}
