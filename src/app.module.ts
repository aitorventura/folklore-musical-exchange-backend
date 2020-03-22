import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { MusicalGroupController } from './musicalgroup/musicalgroup.controller';
import { MusicalGroupService } from './musicalgroup/musicalgroup.service';
import { TypeController } from './type/type.controller';
import { TypeService } from './type/type.service';
import { DataBaseConnection } from './app.database';
import { UserDataBaseConnection } from './user/user.database';
import { PersonDataBaseConnection } from './person/person.database';
import { TypeDataBaseConnection } from './type/type.database';
import { MusicalGroupDataBaseConnection } from './musicalgroup/musicalgroup.database';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PersonController,
    MusicalGroupController,
    TypeController,
  ],
  providers: [
    AppService,
    UserService,
    PersonService,
    MusicalGroupService,
    TypeService,
    DataBaseConnection,
    UserDataBaseConnection,
    PersonDataBaseConnection,
    MusicalGroupDataBaseConnection,
    TypeDataBaseConnection,
  ],
})
export class AppModule {}
