import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import {DataBaseConnection} from '../app.database'

@Injectable()
export class UserService {

  constructor(private readonly dataBase: DataBaseConnection){

  }
  getUser(): string {
    return 'Toma este usuario';
  }

  createUser(userDto: UserDto) {
     this.dataBase.addNewUser(userDto);
  }
}
