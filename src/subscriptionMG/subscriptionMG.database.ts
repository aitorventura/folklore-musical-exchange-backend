import { SubscriptionMGDto } from './subscriptionMG.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class SubscriptionMGDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }
  /*
    async getSubscriptions(id: number) {
      const result = await this.knex
        .select('*')
        .from('TypeSubscription')
        .where({ idPerson: `${id}` });
      return result;
    }*/

  async isSubscribed(idPerson: number, idMGroup: number) {
    let query = `SELECT * FROM MGroupSubscription WHERE idPerson=${idPerson} AND idMGroup=${idMGroup}`;

    try {
      let result = await this.knex.raw(query);
      if (result[0].length != 0) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async addNewSubscriptionMG(subscriptionMGDto: SubscriptionMGDto) {
    let query = `INSERT INTO MGroupSubscription(idPerson, idMGroup)
    VALUES (${subscriptionMGDto.idPerson} ,  '${subscriptionMGDto.idMGroup}')`;
    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteSubscriptionMG(idPerson: number, idMGroup: number) {
    let query = `DELETE FROM MGroupSubscription WHERE idPerson=${idPerson} AND idMGroup=${idMGroup}`;
    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
  }
}
