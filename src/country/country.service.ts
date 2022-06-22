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
    return await this.countryRepository.find({relations: { companies: true }});
  }

  async findItem(_id: number): Promise<Country> {
    return await this.countryRepository.findOneOrFail({where:{id: _id},relations: {companies: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
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
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.countryRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateCountryDTO): Promise<Country>{
    checkNumberOfProperties(DTO);
    await this.countryRepository.findOneOrFail({where: {id: _id}, relations: {companies: true}})
    .then(() => {
      this.countryRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.countryRepository.findOneOrFail({where: {id: _id}, relations: {companies: true}})
  }

  async put(_id: number, DTO: CreateCountryDTO): Promise<Country>{
    checkNumberOfProperties(DTO);
    await this.countryRepository.findOneOrFail({where: {id: _id}, relations: {companies: true}})
    .then(() => {
    this.countryRepository.update(_id, DTO);
    })
    .catch(() => {
      this.countryRepository.insert({
        id: _id,
        ...DTO
      })});
      return await this.countryRepository.findOneOrFail({where: {id: _id}, relations: {companies: true}})
  }

  async create(DTO: CreateCountryDTO): Promise<Country>{
    checkNumberOfProperties(DTO);
    await this.countryRepository.insert(DTO);
    return await this.countryRepository.findOneOrFail({where: {...DTO},relations: {companies: true}}) 
  }
}
