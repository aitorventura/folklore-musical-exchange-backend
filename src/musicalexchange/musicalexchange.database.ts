import { MusicalExchangeDto } from './musicalexchange.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class MusicalExchangeDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getGroups() {
    //HAgo JOIN de user y MGroup para ver la info
    const result = await this.knex
      .select('*')
      .from('MusicalExchange')
      .innerJoin('User', 'MusicalExchange.idMGroupA', 'User.id')
      .innerJoin('MGroup', 'MusicalExchange.idMGroupA', 'MGroup.id')
      .innerJoin('User', 'MusicalExchange.idMGroupB', 'User.id')
      .innerJoin('MGroup', 'MusicalExchange.idMGroupB', 'MGroup.id')
      .where('MusicalExchange.date' >= 'CURRENT_TIMESTAMP');
    return result;
  }

  async getMusicalExchange(id: number) {
    const result = await this.knex
      .select('*')
      .from('MusicalExchange')
      .innerJoin('User', 'MusicalExchange.idMGroupA', 'User.id')
      .innerJoin('MGroup', 'MusicalExchange.idMGroupA', 'MGroup.id')
      .innerJoin('User', 'MusicalExchange.idMGroupB', 'User.id')
      .innerJoin('MGroup', 'MusicalExchange.idMGroupB', 'MGroup.id')
      .where({ 'MusicalExchange.id': `${id}` });
    console.log(result);
    return result;
  }

  async addNewMusicalExchange(musicalexchangeDto: MusicalExchangeDto) {
    if (musicalexchangeDto.idMGroupA == musicalexchangeDto.idMGroupB) {
      console.log(
        'Selecciona la otra agrupación con la que quieres hacer el intercambio',
      );
      //TODO: Debería salir una excepción
      return false;
    }

    let query = `INSERT INTO MusicalExchange (idMGroupA, idMGroupB, date, place, description, repertoire, neededMoney, crowdfundingLink) 
    VALUES (${musicalexchangeDto.idMGroupA}, ${musicalexchangeDto.idMGroupB}, '${musicalexchangeDto.date}', '${musicalexchangeDto.place}', '${musicalexchangeDto.description}', '${musicalexchangeDto.repertoire}', ${musicalexchangeDto.neededMoney}, '${musicalexchangeDto.crowdfundingLink}')`;
    await this.knex.raw(query);
    console.log(query);
  }

  async updateMusicalExchange(musicalExchangeDto: MusicalExchangeDto) {
    if (musicalExchangeDto.idMGroupA == musicalExchangeDto.idMGroupB) {
      console.log(
        'Selecciona la otra agrupación con la que quieres hacer el intercambio',
      );
      //TODO: Debería salir una excepción
      return false;
    }
    let query = `UPDATE MusicalExchange SET idMGroupA = ${musicalExchangeDto.idMGroupA},
                                            idMGroupB = ${musicalExchangeDto.idMGroupB}, 
                                            date = '${musicalExchangeDto.date}', 
                                            place = '${musicalExchangeDto.place}', 
                                            description = '${musicalExchangeDto.description}',
                                            repertoire = '${musicalExchangeDto.repertoire}',
                                            neededMoney = ${musicalExchangeDto.neededMoney},
                                            crowdfundingLink = '${musicalExchangeDto.crowdfundingLink}'

                WHERE id = ${musicalExchangeDto.id}`;
    try {
      console.log('Voy a hacer la query ' + query);
      await this.knex.raw(query);
      return true;
    } catch (error) {
      console.log('Error update musical group');
      return false;
    }
  }

  async deleteMusicalExchange(musicalexchangeId: number) {
    try {
      if ((await this.getMusicalExchange(musicalexchangeId)).length > 0) {
        console.log(
          'No se puede eliminar porque tiene un intercambio pendiente',
        );
        //TODO: Tiene que saltar una excepción para mostrársela al usuario
        return false;
      }
      let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${musicalexchangeId}`;
      const result = await this.knex.raw(query);

      return true;
    } catch (error) {
      console.log('No se puede porque tiene intercambios');
      return false;
    }
  }

  //Ya se verá el uso, hay que rehacerlo (depende de si se busca todos los intercambios de esa persona o solo los nuevos, etc)
  async getMusicalExchangeMGroup(mgroupId: number) {
    try {
      let query = `SELECT * FROM MusicalExchange 
                       WHERE (idMGroupA=${mgroupId} OR idMGroupB=${mgroupId})
                              AND date >= CURRENT_TIMESTAMP`;

      const result = await this.knex.raw(query);
      return result[0];
    } catch (error) {
      console.log('Error en consulta getMusicalExchange(id)');
    }
  }
}
