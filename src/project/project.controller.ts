import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateProjectDTO } from "./dto/createProject.dto";
import { UpdateProjectDTO } from "./dto/updateProject.dto";
import { Project } from "./project.entity";
import { ProjectService } from "./project.service";

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async get(@Param() {id}): Promise<Project>{
    return await this.projectService.findItem(id);
  }

  @Patch(':id')
  async update(@Param() {id}, @Body() DTO: UpdateProjectDTO): Promise<Project>{
    return await this.projectService.update(id, DTO);
  }

  @Put(':id')
  async replace(@Param() {id}, @Body() DTO: CreateProjectDTO): Promise<Project>{
    return await this.projectService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateProjectDTO){
    return await this.projectService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() {id}): Promise<Project>{
    return await this.projectService.remove(id);
  }
}