import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MusicalExchangeDto } from '../musicalexchange/musicalexchange.dto';
import { MusicalExchangeService } from '../musicalexchange/musicalexchange.service';
import { UserDto } from '../user/user.dto';
import { LoginService } from './login.service';
import { AuthUser } from '../shared/decorators/requester.decorator';
import { Requester } from '../shared/entities/requester';
import { MusicalExchangeDataBaseConnection } from '../musicalexchange/musicalexchange.database';
import { LoggedUser } from './logged-user.dto';
import { JwtService } from '../shared/services/jwt.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async isConnected(@Body() userDto: UserDto) {
    return await this.loginService.login(userDto);
  }

  @Get()
  @UseGuards()
  async update(@AuthUser() requester: Requester) {
    const key = this.jwtService.encode({
      id: requester.id,
      role: requester.role,
    });

    const listExchanges = await new MusicalExchangeDataBaseConnection().getMusicalExchangeMGroup(
      requester.id,
    );
    const array = [];
    listExchanges.forEach(element => {
      array.push(element.id);
    });

    const listMusicalExchanges = array.join('#');

    return new LoggedUser({
      token: key,
      role: requester.role,
      id: requester.id,
      listMusicalExchanges: listMusicalExchanges,
    });
  }
}
