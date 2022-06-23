import { Department } from 'src/department/department.entity';
import { Technology } from 'src/technology/technology.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Worker } from 'src/worker/worker.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheme: string;

  @Column()
  stage: string;

  @ManyToOne(() => Department, (department) => department.projects, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  @JoinColumn({name: "departmentid"})
  department: Department;

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable({
    name: 'project_technology',
    joinColumn: {
      name: 'projectid'
    },
    inverseJoinColumn: {
      name: `technologyid`
    }
  })
  technologies: Technology[];

  @ManyToMany (() => Worker, (worker) => worker.projects)
  workers: Worker[];
}