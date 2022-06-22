import { Project } from 'src/project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codelanguage: string;

  @Column({type: 'varchar', length: 50})
  technologyversion: string;

  @Column({type: 'varchar', length: 100})
  technologyname: string;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project[];
}