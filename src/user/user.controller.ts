import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Post('/create')
  async create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
