import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TechnologyController } from "./technology.controller";
import { Technology } from "./technology.entity";
import { TechnologyService } from "./technology.service";

@Module({
    imports: [TypeOrmModule.forFeature([Technology])],
    providers: [TechnologyService],
    controllers: [TechnologyController],
  })
  export class TechnologyModule {}