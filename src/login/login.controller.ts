import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    Param,
  } from '@nestjs/common';
  import { MusicalExchangeDto } from '../musicalexchange/musicalexchange.dto';
  import { MusicalExchangeService } from '../musicalexchange/musicalexchange.service';
import { UserDto } from '../user/user.dto';
import { LoginService } from './login.service';
  
  @Controller('login')
  export class LoginController {
    constructor(
      private readonly loginService: LoginService,
    ) {}
  
    @Post()
    async isConnected(@Body() userDto: UserDto) {
        console.log(userDto)
      return await this.loginService.login(userDto);
    }
  
  }
  