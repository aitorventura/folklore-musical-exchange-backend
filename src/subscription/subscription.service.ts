import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from './subscription.dto';
import { SubscriptionDataBaseConnection } from './subscription.database';

@Injectable()
export class SubscriptionService {
  constructor(private readonly dataBase: SubscriptionDataBaseConnection) {}

  async getSubscriptions(id: number) {
    return await this.dataBase.getSubscriptions(id);
  }

  createSubscription(subscriptionDto: SubscriptionDto) {
    return this.dataBase.addNewSubscription(subscriptionDto);
  }

  updateSubscriptions(id: number, subscriptions: string[]) {
    return this.dataBase.updateSubscriptions(id, subscriptions);
  }

  deleteSubscription(id: number, nameType: string) {
    return this.dataBase.deleteSubscription(id, nameType);
  }

  deleteSubscriptions(id: number) {
    return this.dataBase.deleteSubscriptions(id);
  }
}
