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

    /*try {  Por ahora no devolveré nada
            await this.knex.raw(query);
               return true;    
        } catch(error) {
            return false;
        }*/
  }

  async deleteSubscription(idPerson: number, nameType: string) {
    let query = `DELETE FROM MusicalExchange WHERE idPerson=${idPerson} and nameType=${nameType}`;
    const result = await this.knex.raw(query);
  }
}
