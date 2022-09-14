import { Company } from 'src/company/company.entity';
import { Project } from 'src/project/project.entity';
import { Worker } from 'src/worker/worker.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  departmentname: string;

  @Column({ type: 'varchar', length: 255 })
  departmentlocation: string;

  @ManyToOne(() => Company, (company) => company.departments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'companyid' })
  company: Company;

  @OneToMany(() => Project, (project) => project.department)
  projects: Project[];

  @OneToMany(() => Worker, (worker) => worker.department)
  workers: Worker[];
}
