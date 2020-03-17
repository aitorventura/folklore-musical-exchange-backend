import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { DataBaseConnection } from '../app.database';

@Injectable()
export class PersonService {
  constructor(private readonly dataBase: DataBaseConnection) {}
  getPerson(): string {
    //TODO acabar de hacer
    return 'Toma este usuario';
  }

  createPerson(personDto: PersonDto) {
    this.dataBase.addNewPerson(personDto);
  }
}
