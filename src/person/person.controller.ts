import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonDto } from '../person/person.dto';
import { PersonService } from '../person/person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }
    @Get()
    getPerson() {
        return this.personService.getPerson();
    }

    @Post('/create')
    async createPerson(@Body() personDto: PersonDto) {
        return this.personService.createPerson(personDto);
    }
}
