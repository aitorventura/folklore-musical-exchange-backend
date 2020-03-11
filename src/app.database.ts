import { async } from 'rxjs/internal/scheduler/async';
import { UserDto } from './user/user.dto';
import { PersonDto } from './person/person.dto';

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

  async getGroups() {
    const result = await this.knex.select('*').from('user');

    console.log(result);
  }


  async addNewPerson(personDto: PersonDto) {
    /*if(!personDto.image){
      personDto.image = null;
    }else{
      personDto.image = "'" + personDto.image + "'";
    }*/

    personDto.image = null;
    personDto.role = "PERSON";

    this.addNewUser(personDto);
    let idUser = (await this.getIdUserByEmail(personDto.email));
    console.log(idUser);


    let query = `INSERT INTO Person('id', 'name', 'surname')
    VALUES (${idUser} ,  '${personDto.name}' , '${personDto.surname}')`;

    console.log(query);
  }

  async addNewUser(userDto: UserDto) {
    /*if(!userDto.image){
      userDto.image = null;
    }else{
      userDto.image = "'" + userDto.image + "'";
    }*/

    let query = `INSERT INTO User('role', 'email', 'username', 'password', 'city', 'image')
                VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', ${userDto.image})`;

    console.log(query);
  }

  async getIdUserByEmail(email: string) {

    let query = `SELECT id FROM User WHERE email = ${email}`;

    let result = await (this.knex.raw(query));

    console.log(result);

    return 1;

  }

}

//getGroups().finally(() => knex.destroy());



