import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDTO } from './dto/createCompany.dto';
import { UpdateCompanyDTO } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find({
      relations: { countries: true, departments: true },
    });
  }

  async findItem(_id: number): Promise<Company> {
    return await this.companyRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { countries: true, departments: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such company',
          },
          400,
        );
      });
  }

  async remove(_id: number): Promise<Company> {
    let deleteAim: Company;
    await this.companyRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { countries: true, departments: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such company',
          },
          400,
        );
      })
      .then((data) => {
        deleteAim = data;
        this.companyRepository.delete(_id);
      });
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateCompanyDTO): Promise<Company> {
    checkNumberOfProperties(DTO);
    const original = await this.companyRepository.findOne({
      where: { id: _id },
      relations: { countries: true, departments: true },
    });
    if (original) {
      await this.companyRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.companyRepository.findOne({
      where: { id: _id },
      relations: { countries: true, departments: true },
    });
    return updated;
  }

  async put(_id: number, DTO: CreateCompanyDTO): Promise<Company> {
    checkNumberOfProperties(DTO);
    const original = await this.companyRepository.findOne({
      where: { id: _id },
      relations: { countries: true, departments: true },
    });
    if (original) {
      await this.companyRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.companyRepository.findOne({
      where: { id: _id },
      relations: { countries: true, departments: true },
    });
    return updated;
  }

  async create(DTO: CreateCompanyDTO): Promise<void> {
    await this.companyRepository.save(DTO);
  }
}
