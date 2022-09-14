import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from './worker.controller';
import { Worker } from './worker.entity';
import { WorkerService } from './worker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  providers: [WorkerService],
  controllers: [WorkerController],
})
export class WorkerModule {}
