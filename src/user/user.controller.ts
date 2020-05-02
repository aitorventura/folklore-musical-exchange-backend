import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { isExpression } from '@babel/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Get(':id')
  isExpression(@Param('id') id: number) {
    return this.userService.isPerson(id);
  }

  @Post('/create')
  async create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
