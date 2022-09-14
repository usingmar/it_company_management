import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { DepartmentModule } from './department/department.module';
import { LvlModule } from './lvl/lvl.module';
import { config } from './orm.config';
import { ProjectModule } from './project/project.module';
import { TechnologyModule } from './technology/technology.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CompanyModule,
    CountryModule,
    DepartmentModule,
    LvlModule,
    ProjectModule,
    TechnologyModule,
    WorkerModule,
  ],
})
export class AppModule {}
