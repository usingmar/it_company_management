import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { IsDefined } from 'class-validator';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDTO} from './dto/createCompany.dto';
import { UpdateCompanyDTO } from './dto/updateCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  async get(@Param() {id}): Promise<Company>{
    return await this.companyService.findItem(id);
  }

  @Patch(':id')
  async update(@Param() {id}, @Body() DTO: UpdateCompanyDTO){
    return await this.companyService.update(id, DTO);
  }

  @Put(':id')
  async replace(@Param() {id}, @Body() DTO: CreateCompanyDTO): Promise<Company> {
    return await this.companyService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateCompanyDTO): Promise<void>{
    return await this.companyService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() {id}): Promise<Company>{
    return await this.companyService.remove(id);
  }
}