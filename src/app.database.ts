import { PersonDto } from './person/person.dto';
import { MusicalGroupDto } from './musicalgroup/musicalgroup.dto';
import { UserDto } from './user/user.dto';

export class DataBaseConnection {
  knex;
  constructor() {
    this.knex = require('knex')({
      client: 'mysql',
      connection: {
        host: 'remotemysql.com',
        user: 'pSPx3t9HCI',
        password: 'kFe4CAqbVr',
        database: 'pSPx3t9HCI',
      },
    });
  }
}
