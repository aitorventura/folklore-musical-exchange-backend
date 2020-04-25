import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/user.dto';
import { LoginDataBaseConnection } from './login.database';


@Injectable()
export class LoginService {
  constructor(private readonly dataBase: LoginDataBaseConnection) { }

  async login(userDto: UserDto) {
    return await this.dataBase.login(userDto);
  }

  
}
