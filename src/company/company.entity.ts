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

  @ManyToMany(() => Country, country => country.companies, {cascade: ["insert", "update", "remove"]})
  @JoinTable({
    name: 'company_country',
    joinColumn: {
      name: 'companyid'
    },
    inverseJoinColumn: {
      name: 'countryid'
    }
  })
  countries: Country[]

  @OneToMany(() => Department, department => department.company)
  departments: Department[];
}