import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { DataBaseConnection } from '../app.database';

@Injectable()
export class PersonService {
  constructor(private readonly dataBase: DataBaseConnection) {}
  async getPeople() {
    return await this.dataBase.getPeople();
  }

  async getPerson(id: number) {
    return  await this.dataBase.getPerson(id);
  }

  createPerson(personDto: PersonDto) {
    this.dataBase.addNewPerson(personDto);
  }

  updatePerson(personDto: PersonDto) {
    this.dataBase.updatePerson(personDto);
  }

  deletePerson(id: number) {
    console.log('Service ');
    this.dataBase.deletePerson(id);
  }
}
