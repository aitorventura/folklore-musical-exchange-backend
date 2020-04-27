import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { PersonDto } from '../person/person.dto';
import { PersonService } from '../person/person.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthUser } from '../shared/decorators/requester.decorator';
import { Requester } from '../shared/entities/requester';
import { RequesterRole } from '../shared/enums/requester-role.enum';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPeople(@AuthUser() requester: Requester) {
    if (requester.role !== 'PERSON') {
      throw new ForbiddenException();
    }
    return await this.personService.getPeople();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getPerson(@AuthUser() requester: Requester, @Param('id') id: string) {
    if (
      requester.role !== RequesterRole.PERSON ||
      parseInt(id) !== requester.id
    ) {
      console.log('Recurso');

      throw new ForbiddenException();
    }
    const result = await this.personService.getPerson(parseInt(id));
    return result[0];
  }

  @Post('/create')
  async createPerson(@Body() personDto: PersonDto) {
    return this.personService.createPerson(personDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updatePerson(
    @AuthUser() requester: Requester,
    @Param('id') id: string,
    @Body() personAndSubscriptions: any,
  ) {
    if (
      requester.role !== RequesterRole.PERSON ||
      parseInt(id) !== requester.id
    ) {
      throw new ForbiddenException();
    }

    let personDto: PersonDto = personAndSubscriptions.person;
    let subscriptions: string[] = personAndSubscriptions.subscriptions.subs; //Array.prototype.slice.call(personAndSubscriptions.subscriptions,);

    personDto.id = parseInt(id);

    this.subscriptionService.updateSubscriptions(personDto.id, subscriptions);
    return this.personService.updatePerson(personDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePerson(
    @AuthUser() requester: Requester,
    @Param('id') id: string,
  ) {
    if (
      requester.role !== RequesterRole.PERSON ||
      parseInt(id) !== requester.id
    ) {
      throw new ForbiddenException();
    }
    return this.personService.deletePerson(parseInt(id));
  }
}
