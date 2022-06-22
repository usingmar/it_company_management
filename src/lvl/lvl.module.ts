import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LvlController } from "./lvl.controller";
import { Lvl } from "./lvl.entity";
import { LvlService } from "./lvl.service";

@Module({
    imports: [TypeOrmModule.forFeature([Lvl])],
    providers: [LvlService],
    controllers: [LvlController],
  })
  export class LvlModule {}