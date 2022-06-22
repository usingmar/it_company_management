import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/createDepartmentDTO';
import { UpdateDepartmentDTO } from './dto/updateDepartmentDTO';


@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  getAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async get(@Param() {id}): Promise<Department>{
    return await this.departmentService.findItem(id);
  }

  @Patch(':id')
  async update(@Param() {id}, @Body() DTO: UpdateDepartmentDTO): Promise<Department>{
    return await this.departmentService.update(id, DTO);
  }

  @Put(':id')
  async replace(@Param() {id}, @Body() DTO: CreateDepartmentDTO): Promise<Department>{
    return await this.departmentService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateDepartmentDTO): Promise<Department>{
    return await this.departmentService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() {id}): Promise<Department>{
    return await this.departmentService.remove(id);
  }
}