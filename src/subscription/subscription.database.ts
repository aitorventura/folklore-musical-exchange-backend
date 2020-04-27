import { SubscriptionDto } from './subscription.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class SubscriptionDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getSubscriptions(id: number) {
    const result = await this.knex
      .select('*')
      .from('TypeSubscription')
      .where({ idPerson: `${id}` });
    return result;
  }

  async addNewSubscription(subscriptionDto: SubscriptionDto) {
    let query = `INSERT INTO TypeSubscription(idPerson, nameType)
    VALUES (${subscriptionDto.idPerson} ,  '${subscriptionDto.nameType}')`;
    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateSubscriptions(id: number, subscriptions: string[]) {
    this.deleteSubscriptions(id);

    for (let sub of subscriptions) {
      let subscriptionDto: SubscriptionDto = {
        idPerson: id,
        nameType: sub,
      };
      await this.addNewSubscription(subscriptionDto);
    }
  }

  async deleteSubscription(idPerson: number, nameType: string) {
    let query = `DELETE FROM TypeSubscription WHERE idPerson=${idPerson} AND nameType=${nameType}`;
    const result = await this.knex.raw(query);
  }

  async deleteSubscriptions(idPerson: number) {
    let query = `DELETE FROM TypeSubscription WHERE idPerson=${idPerson}`;

    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
  }
}
