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
    return await this.lvlRepository.findOneOrFail({where:{id: _id},relations: {workers: true }})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such level"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Lvl> {
    let deleteAim: Lvl;
    await this.lvlRepository.findOneOrFail({where: {id: _id}, relations: {workers: true }})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such level"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.lvlRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateLvlDTO): Promise<Lvl> {
    checkNumberOfProperties(DTO);
    const original = await this.lvlRepository.findOne({where: {id: _id}, relations: {workers: true }})
  if(original){  
      await this.lvlRepository.save({id: parseInt(_id.toString()), ...DTO});
  }   
  const updated = await this.lvlRepository.findOne({where: {id: _id}, relations: {workers: true }})     
  return updated
  }

  async put(_id: number, DTO: CreateLvlDTO): Promise<Lvl> {
    checkNumberOfProperties(DTO);
    const original = await this.lvlRepository.findOne({where: {id: _id}, relations: {workers: true }})
  if(original){  
      await this.lvlRepository.save({id: parseInt(_id.toString()), ...DTO});
  }   
  const updated = await this.lvlRepository.findOne({where: {id: _id}, relations: {workers: true }})     
  return updated
  }

  async create(DTO: CreateLvlDTO): Promise<void>{;
    await this.lvlRepository.save(DTO); 
  }
}