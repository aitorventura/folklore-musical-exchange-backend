import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { DataBaseConnection } from '../app.database';

@Injectable()
export class PersonService {
  constructor(private readonly dataBase: DataBaseConnection) {}
  getPeople()  {
    return this.dataBase.getPeople();
  }

  createPerson(personDto: PersonDto) {
    this.dataBase.addNewPerson(personDto);
  }

  updatePerson(personDto: PersonDto) {
    this.dataBase.updatePerson(personDto);
  }
  
}
