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
import { SubscriptionMGController } from './subscriptionMG/subscriptionMG.controller';
import { SubscriptionMGService } from './subscriptionMG/subscriptionMG.service';
import { SubscriptionMGDataBaseConnection } from './subscriptionMG/subscriptionMG.database';
import { LoginController } from './login/login.controller';
import { LoginDataBaseConnection } from './login/login.database';
import { LoginService } from './login/login.service';
import { JwtService } from './shared/services/jwt.service';
import * as jwt from 'jsonwebtoken';

import { config } from 'dotenv';

config();
const jwtServiceProvider = {
  provide: JwtService,
  useFactory: () => {
    return new JwtService(jwt, "fme");
  },
};


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
    LoginController,
    SubscriptionMGController,
  ],
  providers: [
    jwtServiceProvider,
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
    LoginDataBaseConnection,
    LoginService,
    SubscriptionMGDataBaseConnection,
    SubscriptionMGService,
  ],
})
export class AppModule { }
