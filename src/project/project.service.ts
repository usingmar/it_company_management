import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkNumberOfProperties } from 'src/utils/validators';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './dto/createProject.dto';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: { department: true, workers: true, technologies: true },
    });
  }

  async findItem(_id: number): Promise<Project> {
    return await this.projectRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { department: true, workers: true, technologies: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such project',
          },
          400,
        );
      });
  }

  async remove(_id: number): Promise<Project> {
    let deleteAim: Project;
    await this.projectRepository
      .findOneOrFail({
        where: { id: _id },
        relations: { department: true, workers: true, technologies: true },
      })
      .catch(() => {
        throw new HttpException(
          {
            statusCode: '400',
            error: 'Bad request',
            message: 'No such project',
          },
          400,
        );
      })
      .then((data) => {
        deleteAim = data;
        this.projectRepository.delete(_id);
      });
    return deleteAim;
  }

  async update(_id: number, DTO: UpdateProjectDTO): Promise<Project> {
    checkNumberOfProperties(DTO);
    const original = await this.projectRepository.findOne({
      where: { id: _id },
      relations: { department: true, workers: true, technologies: true },
    });
    if (original) {
      await this.projectRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.projectRepository.findOne({
      where: { id: _id },
      relations: { department: true, workers: true, technologies: true },
    });
    return updated;
  }

  async put(_id: number, DTO: CreateProjectDTO): Promise<Project> {
    checkNumberOfProperties(DTO);
    const original = await this.projectRepository.findOne({
      where: { id: _id },
      relations: { department: true, workers: true, technologies: true },
    });
    if (original) {
      await this.projectRepository.save({
        id: parseInt(_id.toString()),
        ...DTO,
      });
    }
    const updated = await this.projectRepository.findOne({
      where: { id: _id },
      relations: { department: true, workers: true, technologies: true },
    });
    return updated;
  }

  async create(DTO: CreateProjectDTO): Promise<void> {
    await this.projectRepository.save(DTO);
  }
}
