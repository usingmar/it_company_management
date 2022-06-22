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
    return await this.departmentRepository.find({relations: { projects: true, company: true }});
  }

  async findItem(_id: number): Promise<Department> {
    return await this.departmentRepository.findOneOrFail({where:{id: _id},relations: {projects: true, company: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Department> {
    let deleteAim: Department;
    await this.departmentRepository.findOneOrFail({where: {id: _id}, relations: {projects: true, company: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.departmentRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateDepartmentDTO): Promise<Department>{
    checkNumberOfProperties(DTO);
    await this.departmentRepository.findOneOrFail({where: {id: _id}, relations: {projects: true, company: true}})
    .then(() => {
      this.departmentRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.departmentRepository.findOneOrFail({where: {id: _id}, relations: {projects: true, company: true}})
  }

  async put(_id: number, DTO: CreateDepartmentDTO): Promise<Department>{
    checkNumberOfProperties(DTO);
    await this.departmentRepository.findOneOrFail({where: {id: _id}, relations: {projects: true, company: true}})
    .then(() => {
    this.departmentRepository.update(_id, DTO);
    })
    .catch(() => {
      this.departmentRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.departmentRepository.findOneOrFail({where: {id: _id}, relations: {projects: true, company: true}})
  }

  async create(DTO: CreateDepartmentDTO): Promise<Department>{
    checkNumberOfProperties(DTO);
    await this.departmentRepository.insert(DTO);
    return await this.departmentRepository.findOneOrFail({where: {...DTO},relations: {projects: true, company: true}}) 
  }
}