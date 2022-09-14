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
import { CreateLvlDTO } from './dto/createLvl.dto';
import { UpdateLvlDTO } from './dto/updateLvl.dto';
import { Lvl } from './lvl.entity';
import { LvlService } from './lvl.service';

@Controller('lvl')
export class LvlController {
  constructor(private readonly lvlService: LvlService) {}

  @Get()
  getAll(): Promise<Lvl[]> {
    return this.lvlService.findAll();
  }

  @Get(':id')
  async get(@Param() { id }): Promise<Lvl> {
    return await this.lvlService.findItem(id);
  }

  @Patch(':id')
  async update(@Param() { id }, @Body() DTO: UpdateLvlDTO): Promise<Lvl> {
    return await this.lvlService.update(id, DTO);
  }

  @Put(':id')
  async replace(@Param() { id }, @Body() DTO: CreateLvlDTO): Promise<Lvl> {
    return await this.lvlService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateLvlDTO) {
    return await this.lvlService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() { id }): Promise<Lvl> {
    return await this.lvlService.remove(id);
  }
}
