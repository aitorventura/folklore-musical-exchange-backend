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
import { SubscriptionService } from 'src/subscription/subscription.service';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  async getPeople() {
    return await this.personService.getPeople();
  }

  @Get(':id')
  async getPerson(@Param('id') id: number) {
    const result = await this.personService.getPerson(id);
    return result[0];
  }

  @Post('/create')
  async createPerson(@Body() personDto: PersonDto) {
    return this.personService.createPerson(personDto);
  }

  @Put(':id')
  async updatePerson(
    @Param('id') id: number,
    @Body() personAndSubscriptions: any,
  ) {
    let personDto: PersonDto = personAndSubscriptions.person;
    let subscriptions: string[] = personAndSubscriptions.subscriptions.subs; //Array.prototype.slice.call(personAndSubscriptions.subscriptions,);

    personDto.id = id;

    this.subscriptionService.updateSubscriptions(personDto.id, subscriptions);
    return this.personService.updatePerson(personDto);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number) {
    console.log('Backend: ' + id);
    return this.personService.deletePerson(id);
  }
}
