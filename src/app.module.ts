import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DataBaseConnection } from './app.database';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, DataBaseConnection],
})
export class AppModule {}
