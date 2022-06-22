import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { CreateWorkerDTO } from './dto/createWorker.dto';
import { UpdateWorkerDTO } from './dto/updateWorker.dto';
import { Worker } from './worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return await this.workerRepository.find({relations: { department: true, lvl: true, projects: true }});
  }

  async findItem(_id: number): Promise<Worker> {
    return await this.workerRepository.findOneOrFail({where:{id: _id},relations: {department: true, lvl: true, projects: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Worker> {
    let deleteAim: Worker;
    await this.workerRepository.findOneOrFail({where: {id: _id}, relations: {department: true, lvl: true, projects: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.workerRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateWorkerDTO): Promise<Worker>{
    checkNumberOfProperties(DTO);
    await this.workerRepository.findOneOrFail({where: {id: _id}, relations: {department: true, lvl: true, projects: true}})
    .then(() => {
      this.workerRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.workerRepository.findOneOrFail({where: {id: _id}, relations: {department: true, lvl: true, projects: true}})
  }

  async put(_id: number, DTO: CreateWorkerDTO): Promise<Worker>{
    checkNumberOfProperties(DTO);
    await this.workerRepository.findOneOrFail({where: {id: _id}, relations: {department: true, lvl: true, projects: true}})
    .then(() => {
    this.workerRepository.update(_id, DTO);
    })
    .catch(() => {
      this.workerRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.workerRepository.findOneOrFail({where: {id: _id}, relations: {department: true, lvl: true, projects: true}})
  }

  async create(DTO: CreateWorkerDTO): Promise<Worker>{
    checkNumberOfProperties(DTO);
    await this.workerRepository.insert(DTO);
    return await this.workerRepository.findOneOrFail({where: {...DTO},relations: {department: true, lvl: true, projects: true}}) 
  }
}