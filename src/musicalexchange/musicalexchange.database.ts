import { MusicalExchangeDto } from './musicalexchange.dto';
import { DataBaseConnection } from 'src/app.database';

export class MusicalExchangeDataBaseConnection extends DataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getMusicalExchanges() {
    console.log('getMusicalExchanges BBDD TODOS');
    try {
      let query = `SELECT m.id, m.idMGroupA, m.idMGroupB, m.date, m.place, m.description, m.repertoire, m.neededMoney, m.crowdfundingLink, mA.name as nombreMA, mB.name as nombreMB
                   FROM MusicalExchange as m
                   JOIN MGroup AS mA ON mA.id=m.idMGroupA 
                   JOIN MGroup AS mB ON mB.id=m.idMGroupB`;
      /*const result = await this.knex
        .select('*')
        .from('MusicalExchange')
        .innerJoin(this.knex.raw("MGroup as g1 ON MGroup.id = MusicalExchange.idMGroupA"))
        .innerJoin(this.knex.raw("MGroup as g2 ON MGroup.id = MusicalExchange.idMGroupB"))
        .where('MusicalExchange.date' >= 'CURRENT_TIMESTAMP');
      console.log('Intercambios: ' + result);*/
      const result = await this.knex.raw(query);
      return result[0];
    } catch (error) {
      console.log('Error al obtener los intercambios.');
    }
  }

  async getMusicalExchange(id: number) {
    console.log('getMusicalExchanges(id) bbdd: ' + id);
    try {
      let query = `SELECT idMGroupA, idMGroupB, date, place, MusicalExchange.description, repertoire, neededMoney, crowdfundingLink FROM MusicalExchange JOIN MGroup AS MGroupA ON MGroupA.id=MusicalExchange.idMGroupA JOIN MGroup AS MGroupB ON MGroupB.id=MusicalExchange.idMGroupB WHERE MusicalExchange.id=${id}`;
      const result = await this.knex.raw(query);
      console.log('Resultado de id: ' + result[0]);
      return result[0];
    } catch (error) {
      console.log('Error al obtener el intercambios con el id.');
    }
  }

  async addNewMusicalExchange(musicalexchangeDto: MusicalExchangeDto) {
    /*console.log('id: ' + musicalexchangeDto.id);
    console.log('idMGroupA: ' + musicalexchangeDto.idMGroupA);
    console.log('idMGroupB: ' + musicalexchangeDto.idMGroupB);
    console.log('description: ' + musicalexchangeDto.description);
    console.log('neededMoney: ' + musicalexchangeDto.neededMoney);
    console.log('crowdfundingLink: ' + musicalexchangeDto.crowdfundingLink);*/
    console.log('date: ' + musicalexchangeDto.date);

    //Pasamos la fecha recibida a tipo String
    var fecha = musicalexchangeDto.date.toLocaleString();
    console.log('fecha: ' + fecha);

    if (musicalexchangeDto.idMGroupA == musicalexchangeDto.idMGroupB) {
      console.log(
        'Selecciona la otra agrupación con la que quieres hacer el intercambio. No puedes realizar un intercambio contigo mismo',
      );
    }
    if (musicalexchangeDto.neededMoney == 0) {
      console.log(
        'Como el dinero necesario es 0, es decir, no lo han modificado, lo cambio y lo pongo a null',
      );
      musicalexchangeDto.neededMoney = null;
    }

    let query = `INSERT INTO MusicalExchange (idMGroupA, idMGroupB, date, place, description, repertoire, neededMoney, crowdfundingLink) 
    VALUES (${musicalexchangeDto.idMGroupA}, ${musicalexchangeDto.idMGroupB}, '${fecha}', '${musicalexchangeDto.place}', '${musicalexchangeDto.description}', '${musicalexchangeDto.repertoire}', ${musicalexchangeDto.neededMoney}, '${musicalexchangeDto.crowdfundingLink}')`;

    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
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
      await this.knex.raw(query);
      return true;
    } catch (error) {
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
