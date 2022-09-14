import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Country } from './country.entity';
import { CountryService } from './country.service';
import { CreateCountryDTO } from './dto/createCountry.dto';
import { UpdateCountryDTO } from './dto/updateCountry.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async get(@Param() { id }): Promise<Country> {
    return await this.countryService.findItem(id);
  }

  @Patch(':id')
  async update(
    @Param() { id },
    @Body() DTO: UpdateCountryDTO,
  ): Promise<Country> {
    return await this.countryService.update(id, DTO);
  }

  @Put(':id')
  async replace(
    @Param() { id },
    @Body() DTO: CreateCountryDTO,
  ): Promise<Country> {
    return await this.countryService.put(id, DTO);
  }

  @Post()
  async create(@Body() DTO: CreateCountryDTO) {
    return await this.countryService.create(DTO);
  }

  @Delete(':id')
  async delete(@Param() { id }): Promise<Country> {
    return await this.countryService.remove(id);
  }
}
