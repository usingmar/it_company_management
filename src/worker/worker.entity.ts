import { Department } from 'src/department/department.entity';
import { Lvl } from 'src/lvl/lvl.entity';
import { Project } from 'src/project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  workername: string;

  @Column({type: 'varchar', length: 255})
  workersurname: string;

  @Column()
  dateofmembership: Date;

  @Column()
  salary : number;
  
  @ManyToOne(() => Lvl, (lvl) => lvl.workers)
  @JoinColumn({ name: "lvlid" })
  lvl : Lvl;

  @ManyToOne(() => Department, (department) => department.workers, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  @JoinColumn({name: "departmentid"})
  department: Department;

  @ManyToMany(() => Project, (project) => project.workers)
  @JoinTable({
    name: 'worker_project',
    joinColumn: {
      name: 'workerid'
      
    },
    inverseJoinColumn: {
      name: 'projectid' 
    }
  })
  projects: Project[];
}