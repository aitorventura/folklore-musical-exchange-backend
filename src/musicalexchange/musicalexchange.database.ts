import { MusicalExchangeDto } from './musicalexchange.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class MusicalExchangeDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getMusicalExchanges() {
    //HAgo JOIN de user y MGroup para ver la info
    //En un principio hago where para ver solo los intercambios pendientes, pero esto se haría con filtro
    console.log('getMusicalExchanges BBDD TODOS');
    try {
      let query = `SELECT * FROM MusicalExchange JOIN MGroup AS MGroupA ON MGroupA.id=MusicalExchange.idMGroupA JOIN MGroup AS MGroupB ON MGroupB.id=MusicalExchange.idMGroupB WHERE date>= CURRENT_TIMESTAMP`;
      const result = await this.knex.raw(query);
      return result[0];
      /*
    const result = await this.knex
      .select('*')
      .from('MusicalExchange')
      .innerJoin('MGroup', 'MusicalExchange.idMGroupA', 'MGroup.id')
      .where('MusicalExchange.date' >= 'CURRENT_TIMESTAMP');
    return result;
    */
    } catch (error) {
      console.log('Error al obtener los intercambios.');
    }
  }

  async getMusicalExchange(id: number) {
    /*
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
    */

    console.log('getMusicalExchanges(id) bbdd: ' + id);
    try {
      let query = `SELECT * FROM MusicalExchange JOIN MGroup AS MGroupA ON MGroupA.id=MusicalExchange.idMGroupA JOIN MGroup AS MGroupB ON MGroupB.id=MusicalExchange.idMGroupB WHERE MusicalExchange.id=${id}`;
      const result = await this.knex.raw(query);
      console.log('Resultado de id: ' + result[0]);
      return result[0];
    } catch (error) {
      console.log('Error al obtener el intercambios con el id.');
    }
  }

  async addNewMusicalExchange(musicalexchangeDto: MusicalExchangeDto) {
    console.log('id: ' + musicalexchangeDto.id);
    console.log('idMGroupA: ' + musicalexchangeDto.idMGroupA);
    console.log('idMGroupB: ' + musicalexchangeDto.idMGroupB);
    console.log('description: ' + musicalexchangeDto.description);
    console.log('neededMoney: ' + musicalexchangeDto.neededMoney);
    console.log('crowdfundingLink: ' + musicalexchangeDto.crowdfundingLink);
    console.log('date: ' + musicalexchangeDto.date);

    console.log('addNewMusicalExchange bbdd');
    console.log(
      'A: ' +
        musicalexchangeDto.idMGroupA +
        ' B: ' +
        musicalexchangeDto.idMGroupB,
    );
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
      let query = `DELETE FROM MusicalExchange WHERE id=${musicalexchangeId}`;
      const result = await this.knex.raw(query);
      return true;
      /*
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
      */
    } catch (error) {
      console.log('No se puede eliminar el intercambio');
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
