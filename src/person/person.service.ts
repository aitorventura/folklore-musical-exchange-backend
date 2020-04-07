import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { PersonDataBaseConnection } from './person.database';

@Injectable()
export class PersonService {
  constructor(private readonly dataBase: PersonDataBaseConnection) { }
  async getPeople() {
    return await this.dataBase.getPeople();
  }

  async getPerson(id: number) {
    return await this.dataBase.getPerson(id);
  }

  createPerson(personDto: PersonDto) {
    return this.dataBase.addNewPerson(personDto);
  }

  updatePerson(personDto: PersonDto) {
    return this.dataBase.updatePerson(personDto);
  }

  deletePerson(id: number) {
    return this.dataBase.deletePerson(id);
  }
}
