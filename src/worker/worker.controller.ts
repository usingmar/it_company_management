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
import { CreateWorkerDTO } from './dto/createWorker.dto';
import { UpdateWorkerDTO } from './dto/updateWorker.dto';
import { Worker } from './worker.entity';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  getAll(): Promise<Worker[]> {
    return this.workerService.findAll();
  }

  @Get(':id')
  async get(@Param() { id }): Promise<Worker> {
    return await this.workerService.findItem(id);
  }

  @Patch(':id')
  async update(@Param() { id }, @Body() DTO: UpdateWorkerDTO): Promise<Worker> {
    return await this.workerService.update(id, DTO);
  }

  @Put(':id')
  async replace(
    @Param() { id },
    @Body() DTO: CreateWorkerDTO,
  ): Promise<Worker> {
    return await this.workerService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateWorkerDTO) {
    return await this.workerService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() { id }): Promise<Worker> {
    return await this.workerService.remove(id);
  }
}
