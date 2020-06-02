import { DataBaseConnection } from 'src/app.database';
import { UserDto } from '../user/user.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '../shared/services/jwt.service';
import { Injectable } from '@nestjs/common';
import { LoggedUser } from './logged-user.dto';
import { identity } from 'rxjs';
import { MusicalExchangeDataBaseConnection } from '../musicalexchange/musicalexchange.database';

@Injectable()
export class LoginDataBaseConnection extends DataBaseConnection {
  knex;
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async login(userDto: UserDto) {
    try {
      const query = `SELECT * FROM User WHERE username = '${userDto.username}' AND password = AES_ENCRYPT('${userDto.password}' , 'fme')`;
      const result = await this.knex.raw(query);

      if (result[0].length === 0) {
        return null;
      }

      const user = plainToClass(UserDto, result[0][0]);
      const key = this.jwtService.encode({
        id: user.id,
        role: user.role,
      });

      const listExchanges = await new MusicalExchangeDataBaseConnection().getMusicalExchangeMGroup(
        user.id,
      );
      const array = [];
      listExchanges.forEach(element => {
        array.push(element.id);
      });

      const listMusicalExchanges = array.join('#');

      return new LoggedUser({
        token: key,
        role: user.role,
        id: user.id,
        listMusicalExchanges: listMusicalExchanges,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
