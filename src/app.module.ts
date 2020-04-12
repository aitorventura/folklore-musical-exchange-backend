import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseConnection } from './app.database';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserDataBaseConnection } from './user/user.database';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { PersonDataBaseConnection } from './person/person.database';
import { MusicalGroupController } from './musicalgroup/musicalgroup.controller';
import { MusicalGroupService } from './musicalgroup/musicalgroup.service';
import { MusicalGroupDataBaseConnection } from './musicalgroup/musicalgroup.database';
import { TypeController } from './type/type.controller';
import { TypeService } from './type/type.service';
import { TypeDataBaseConnection } from './type/type.database';
import { MusicalExchangeController } from './musicalexchange/musicalexchange.controller';
import { MusicalExchangeService } from './musicalexchange/musicalexchange.service';
import { MusicalExchangeDataBaseConnection } from './musicalexchange/musicalexchange.database';
import { SubscriptionController } from './subscription/subscription.controller';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionDataBaseConnection } from './subscription/subscription.database';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PersonController,
    MusicalGroupController,
    TypeController,
    MusicalExchangeController,
    SubscriptionController,
  ],
  providers: [
    AppService,
    DataBaseConnection,
    UserService,
    UserDataBaseConnection,
    PersonService,
    PersonDataBaseConnection,
    MusicalGroupService,
    MusicalGroupDataBaseConnection,
    TypeService,
    TypeDataBaseConnection,
    MusicalExchangeService,
    MusicalExchangeDataBaseConnection,
    SubscriptionService,
    SubscriptionDataBaseConnection,
  ],
})
export class AppModule {}
