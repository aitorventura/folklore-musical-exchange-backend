import { SubscriptionMGDto } from './subscriptionMG.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class SubscriptionMGDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getSubscriptionsMG(id: number) {
    let query = `SELECT DISTINCT * FROM User JOIN MGroup ON (User.id = MGroup.id) JOIN MGroupSubscription ON (MGroup.id = MGroupSubscription.idMGroup) WHERE MGroupSubscription.idPerson=${id}`;

    try {
      let result = await this.knex.raw(query);
      return result[0];
    } catch (error) {
      console.log('Ha ocurrido un error al sacar las subscripciones a GRUPOS');
    }

    try {
      let query = `SELECT DISTINCT m.id, m.name, m.description, m.members, m.nameType, u.image
      FROM User AS u
      JOIN MGroup AS m ON u.id=m.id
      JOIN MGroupSubscription AS s ON m.id=s.idMGroup
      WHERE s.idPerson=${id}`;
      const result = await this.knex.raw(query);
      return result[0];
    } catch (error) {
      console.log('Error al obtener los intercambios.');
    }
  }

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
