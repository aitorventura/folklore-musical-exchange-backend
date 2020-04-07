import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserDataBaseConnection } from './user.database'

@Injectable()
export class UserService {

  constructor(private readonly dataBase: UserDataBaseConnection) {

  }
  getUser(): string {
    return 'Toma este usuario';
  }

  createUser(userDto: UserDto) {
    return this.dataBase.addNewUser(userDto);
  }
}
