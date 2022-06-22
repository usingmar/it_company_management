import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { CreateTechnologyDTO } from './dto/createTechnology.dto';
import { UpdateTechnologyDTO } from './dto/updateTechnology.dto';
import { Technology } from './technology.entity';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async findAll(): Promise<Technology[]> {
    return await this.technologyRepository.find({relations: { projects: true }});
  }

  async findItem(_id: number): Promise<Technology> {
    return await this.technologyRepository.findOneOrFail({where:{id: _id},relations: {projects: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Technology> {
    let deleteAim: Technology;
    await this.technologyRepository.findOneOrFail({where: {id: _id}, relations: {projects: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.technologyRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateTechnologyDTO): Promise<Technology>{
    checkNumberOfProperties(DTO);
    await this.technologyRepository.findOneOrFail({where: {id: _id}, relations: {projects: true}})
    .then(() => {
      this.technologyRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.technologyRepository.findOneOrFail({where: {id: _id}, relations: {projects: true}})
  }

  async put(_id: number, DTO: CreateTechnologyDTO): Promise<Technology>{
    checkNumberOfProperties(DTO);
    await this.technologyRepository.findOneOrFail({where: {id: _id}, relations: {projects: true}})
    .then(() => {
    this.technologyRepository.update(_id, DTO);
    })
    .catch(() => {
      this.technologyRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.technologyRepository.findOneOrFail({where: {id: _id}, relations: {projects: true}})
  }

  async create(DTO: CreateTechnologyDTO): Promise<Technology>{
    checkNumberOfProperties(DTO);
    await this.technologyRepository.insert(DTO);
    return await this.technologyRepository.findOneOrFail({where: {...DTO},relations: {projects: true}}) 
  }
}