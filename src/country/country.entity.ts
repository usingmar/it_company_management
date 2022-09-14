import { Company } from 'src/company/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  countryname: string;

  @Column({ type: 'varchar', length: 255 })
  continentname: string;

  @ManyToMany(() => Company, (company) => company.countries)
  companies: Company[];
}
