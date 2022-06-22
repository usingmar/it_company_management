import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/createProject.dto';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({relations: { department: true, technologies: true, workers: true }});
  }

  async findItem(_id: number): Promise<Project> {
    return await this.projectRepository.findOneOrFail({where:{id: _id},relations: {department: true, technologies: true, workers: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Project> {
    let deleteAim: Project;
    await this.projectRepository.findOneOrFail({where: {id: _id}, relations: {department: true, technologies: true, workers: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.projectRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateProjectDTO): Promise<Project>{
    checkNumberOfProperties(DTO);
    await this.projectRepository.findOneOrFail({where: {id: _id}, relations: {department: true, technologies: true, workers: true}})
    .then(() => {
      this.projectRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.projectRepository.findOneOrFail({where: {id: _id}, relations: {department: true, technologies: true, workers: true}})
  }

  async put(_id: number, DTO: CreateProjectDTO): Promise<Project>{
    checkNumberOfProperties(DTO);
    await this.projectRepository.findOneOrFail({where: {id: _id}, relations: {department: true, technologies: true, workers: true}})
    .then(() => {
    this.projectRepository.update(_id, DTO);
    })
    .catch(() => {
      this.projectRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.projectRepository.findOneOrFail({where: {id: _id}, relations: {department: true, technologies: true, workers: true}})
  }

  async create(DTO: CreateProjectDTO): Promise<Project>{
    checkNumberOfProperties(DTO);
    await this.projectRepository.insert(DTO);
    return await this.projectRepository.findOneOrFail({where: {...DTO},relations: {department: true, technologies: true, workers: true}}) 
  }
}