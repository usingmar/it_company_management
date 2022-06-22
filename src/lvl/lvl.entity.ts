import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Worker } from 'src/worker/worker.entity';

@Entity()
export class Lvl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lvlname: string;

  @Column()
  minexprience: string;

  @OneToMany(() => Worker, (worker) => worker.lvl)
  workers: Worker[];
}