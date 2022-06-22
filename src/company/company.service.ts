import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { checkNumberOfProperties} from 'src/utils/validators';
import { InsertResult, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDTO} from './dto/createCompany.dto';
import { UpdateCompanyDTO } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({relations: { countries: true }});
  }

  async findItem(_id: number): Promise<Company> {
    return await this.companyRepository.findOneOrFail({where:{id: _id},relations: {countries: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)
  })
  }

  async remove(_id: number): Promise<Company> {
    let deleteAim: Company;
    await this.companyRepository.findOneOrFail({where: {id: _id}, relations: {countries: true}})
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    .then((data) => {
      deleteAim = data;
      this.companyRepository.delete(_id);
    })
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateCompanyDTO): Promise<Company>{
    checkNumberOfProperties(DTO);
    await this.companyRepository.findOneOrFail({where: {id: _id}, relations: {countries: true}})
    .then(() => {
      this.companyRepository.update(_id, DTO);
    })
    .catch(() => {
      throw new HttpException({
      statusCode: "400",
      error: "Bad request",
      message: "No such user"
    }, 400)})
    return await this.companyRepository.findOneOrFail({where: {id: _id}, relations: {countries: true}})
  }

  async put(_id: number, DTO: CreateCompanyDTO): Promise<Company>{
    checkNumberOfProperties(DTO);

    let item: Promise<Company>;
    await this.companyRepository.findOneOrFail({where: {id: _id}, relations: {countries: true}})
    .catch(() => {
      this.companyRepository.insert({
        id: _id,
        ...DTO
      })
    })
    .then(() => {
      this.companyRepository.update(_id, DTO);
    }).then(() => {
      return item = this.companyRepository.findOne({where: {id: _id}, relations: {countries: true}});
    })
      return await item;
      //return await this.companyRepository.save({id : _id, ...DTO});
  }

  async create(DTO: CreateCompanyDTO): Promise<void>{
    checkNumberOfProperties(DTO);
    await this.companyRepository.insert(DTO);
    //return await this.companyRepository.findOneOrFail({where: {...DTO},relations: {countries: true}}); 
  }
}