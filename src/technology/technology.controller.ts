import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTechnologyDTO } from './dto/createTechnology.dto';
import { UpdateTechnologyDTO } from './dto/updateTechnology.dto';
import { Technology } from './technology.entity';
import { TechnologyService } from './technology.service';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Get()
  getAll(): Promise<Technology[]> {
    return this.technologyService.findAll();
  }

  @Get(':id')
  async get(@Param() { id }): Promise<Technology> {
    return await this.technologyService.findItem(id);
  }

  @Patch(':id')
  async update(
    @Param() { id },
    @Body() DTO: UpdateTechnologyDTO,
  ): Promise<Technology> {
    return await this.technologyService.update(id, DTO);
  }

  @Put(':id')
  async replace(
    @Param() { id },
    @Body() DTO: CreateTechnologyDTO,
  ): Promise<Technology> {
    return await this.technologyService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateTechnologyDTO) {
    return await this.technologyService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() { id }): Promise<Technology> {
    return await this.technologyService.remove(id);
  }
}
