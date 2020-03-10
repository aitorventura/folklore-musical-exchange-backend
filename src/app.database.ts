import { async } from 'rxjs/internal/scheduler/async';
import { UserDto } from './user/user.dto';

export class DataBaseConnection {
  knex;
  constructor(){

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
  
  async addNewUser(userDto: UserDto){
    if(!userDto.image){
      userDto.image = null;
    }else{
      userDto.image = "'" + userDto.image + "'";
    }
    
    let query = `INSERT INTO USER('role', 'email', 'username', 'password', 'city', 'image')
                VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'folkloremusicalexchangepass') , '${userDto.city}', ${userDto.image})`;
    
    console.log(query);     
  }

}

//getGroups().finally(() => knex.destroy());



