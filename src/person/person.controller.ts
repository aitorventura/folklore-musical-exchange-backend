import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { PersonDto } from '../person/person.dto';
import { PersonService } from '../person/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Get()
  getPeople() {
    return this.personService.getPeople();
  }

  @Get(':id')
  getPerson(@Param('id') id: number) {
    return this.personService.getPerson(id);
  }

  @Post('/create')
  async createPerson(@Body() personDto: PersonDto) {
    return this.personService.createPerson(personDto);
  }

  @Put(':id')
  async updatePerson(@Param('id') id: number, @Body() personDto: PersonDto) {
    personDto.id = id;
    return this.personService.updatePerson(personDto);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number) {
    console.log('Backend: ' + id);
    return this.personService.deletePerson(id);
  }
}
