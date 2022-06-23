import { Country } from "./country.entity";
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCountryDTO } from "./dto/updateCountry.dto";
import { CreateCountryDTO } from "./dto/createCountry.dto";
import { checkNumberOfProperties } from "src/utils/validators";

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find({relations: { companies: true}});
  }

  async findItem(_id: number): Promise<Country> {
    return await this.countryRepository.findOneOrFail({where:{id: _id},relations: {companies: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such country"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Country> {
    let deleteAim: Country;
    await this.countryRepository.findOneOrFail({where: {id: _id}, relations: {companies: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such country"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.countryRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateCountryDTO): Promise<Country> {
    checkNumberOfProperties(DTO);
    const original = await this.countryRepository.findOne({where: {id: _id}, relations: {companies: true}})
  if(original){  
      await this.countryRepository.save({id: parseInt(_id.toString()), ...DTO});
  }   
  const updated = await this.countryRepository.findOne({where: {id: _id}, relations: {companies: true}})     
  return updated
  }

  async put(_id: number, DTO: CreateCountryDTO): Promise<Country> {
    checkNumberOfProperties(DTO);
    const original = await this.countryRepository.findOne({where: {id: _id}, relations: {companies: true}})
  if(original){  
      await this.countryRepository.save({id: parseInt(_id.toString()), ...DTO});
  }   
  const updated = await this.countryRepository.findOne({where: {id: _id}, relations: {companies: true}})     
  return updated
  }

  async create(DTO: CreateCountryDTO): Promise<void>{;
    await this.countryRepository.save(DTO); 
  }
}

