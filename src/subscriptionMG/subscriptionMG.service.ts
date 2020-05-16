import { Injectable } from '@nestjs/common';
import { SubscriptionMGDto } from './subscriptionMG.dto';
import { SubscriptionMGDataBaseConnection } from './subscriptionMG.database';

@Injectable()
export class SubscriptionMGService {
  constructor(private readonly dataBase: SubscriptionMGDataBaseConnection) { }

  createSubscriptionMG(subscriptionMGDto: SubscriptionMGDto) {
    return this.dataBase.addNewSubscriptionMG(subscriptionMGDto);
  }

  getSubscriptionsMG(idPerson: number) {
    return this.dataBase.getSubscriptionsMG(idPerson);
  }

  deleteSubscriptionMG(idPerson: number, idMGroup: number) {
    return this.dataBase.deleteSubscriptionMG(idPerson, idMGroup);
  }

  isSubscribed(idPerson: number, idMGroup: number) {
    return this.dataBase.isSubscribed(idPerson, idMGroup);
  }
}
