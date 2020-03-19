import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { DataBaseConnection } from './app.database';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { MusicalGroupController } from './musicalgroup/musicalgroup.controller';
import { MusicalGroupService } from './musicalgroup/musicalgroup.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PersonController,
    MusicalGroupController,
  ],
  providers: [
    AppService,
    UserService,
    DataBaseConnection,
    PersonService,
    MusicalGroupService,
  ],
})
export class AppModule {}
