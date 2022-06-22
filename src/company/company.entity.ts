import { Country } from 'src/country/country.entity';
import { Department } from 'src/department/department.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  companyname: string;

  @Column({type: 'varchar', length: 255})
  companytype: string;

  @Column()
  numberofworkers: number;

  @Column()
  countries: number[]

  @ManyToMany(() => Country, country => country.companies)
  @JoinTable({
    name: 'company_country',
    joinColumn: {
      name: 'companyid'
    },
    inverseJoinColumn: {
      name: 'countryid'
    }
  })

  @OneToMany(() => Department, department => department.company)
  departments: Department[];
}