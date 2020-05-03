import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
//import { isExpression } from '@babel/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get(':id/check')
  isPerson(@Param('id') id: number) {
    let result = this.userService.isPerson(id);
    return result;
  }

  @Post('/create')
  async create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
