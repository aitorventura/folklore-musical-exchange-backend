import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { PersonDto } from '../person/person.dto';
import { PersonService } from '../person/person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }
    @Get()
    getPeople() {
        return this.personService.getPeople();
    }

    @Post('/create')
    async createPerson(@Body() personDto: PersonDto) {
        return this.personService.createPerson(personDto);
    }


    @Put('/:id')
    async updatePerson(@Param('id') id: number, @Body() personDto: PersonDto) {
    personDto.id = id;
    return this.personService.updatePerson(personDto);
  }
}
