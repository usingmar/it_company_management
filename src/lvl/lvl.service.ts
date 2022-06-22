import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { CreateLvlDTO } from './dto/createLvl.dto';
import { UpdateLvlDTO } from './dto/updateLvl.dto';
import { Lvl } from './lvl.entity';

@Injectable()
export class LvlService {
  constructor(
    @InjectRepository(Lvl)
    private lvlRepository: Repository<Lvl>,
  ) {}

  async findAll(): Promise<Lvl[]> {
    return await this.lvlRepository.find({relations: { workers: true }});
  }

  async findItem(_id: number): Promise<Lvl> {
    return await this.lvlRepository.findOneOrFail({where:{id: _id},relations: {workers: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Lvl> {
    let deleteAim: Lvl;
    await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.lvlRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateLvlDTO): Promise<Lvl>{
    checkNumberOfProperties(DTO);
    await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true}})
    .then(() => {
      this.lvlRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true}})
  }

  async put(_id: number, DTO: CreateLvlDTO): Promise<Lvl>{
    checkNumberOfProperties(DTO);
    await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true}})
    .then(() => {
    this.lvlRepository.update(_id, DTO);
    })
    .catch(() => {
      this.lvlRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true}})
  }

  async create(DTO: CreateLvlDTO): Promise<Lvl>{
    checkNumberOfProperties(DTO);
    await this.lvlRepository.insert(DTO);
    return await this.lvlRepository.findOneOrFail({where: {...DTO},relations: {workers: true}}) 
  }
}