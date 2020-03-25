import { MusicalGroupDto } from './musicalgroup.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class MusicalGroupDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async getGroups() {
    const result = await this.knex
      .select('*')
      .from('MGroup')
      .innerJoin('User', 'MGroup.id', 'User.id')
      .where({ 'User.dateUnsubscribe': null });
    return result;
  }

  async getMusicalGroup(id: number) {
    const result = await this.knex
      .select('*')
      .from('MGroup')
      .innerJoin('User', 'MGroup.id', 'User.id')
      .where({ 'MGroup.id': `${id}` });
    console.log(result);
    return result;
  }

  async addNewMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    musicalgroupDto.image = null;
    musicalgroupDto.role = 'MGROUP';

    await this.addNewUser(musicalgroupDto);
    let idUser = await this.getIdUserByEmail(musicalgroupDto.email);

    let query = `INSERT INTO MGroup(id, name, description,members,nameType)
    VALUES (${idUser} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , ${musicalgroupDto.members} , '${musicalgroupDto.nameType}')`;

    await this.knex.raw(query);
    console.log(query);
    //FIXME: devolver true/false y añadir realmente a la BBDD
  }

  async updateMusicalGroup(musicalGroupDto: MusicalGroupDto) {
    musicalGroupDto.image = null;
    musicalGroupDto.role = 'MGROUP';

    const updated = await this.updateUser(musicalGroupDto);

    let query = `UPDATE MGroup SET name = '${musicalGroupDto.name}',
                      description = '${musicalGroupDto.description}', 
                      members = ${musicalGroupDto.members}, 
                      nameType = '${musicalGroupDto.nameType}' 
                    WHERE id = ${musicalGroupDto.id}`;

    try {
      if (updated) {
        console.log('Voy a hacer la query ' + query);
        await this.knex.raw(query);
        console.log('He hecho await a la query de mgroup');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error update mgroup');
      return false;
    }
  }

  async deleteMusicalGroup(musicalgroupId: number) {
    try {
      if ((await this.getMusicalExchange(musicalgroupId)).length > 0) {
        console.log(
          'No se puede eliminar porque tiene un intercambio pendiente',
        );
        //TODO: Tiene que saltar una excepción para mostrársela al usuario
        return false;
      }
      let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${musicalgroupId}`;
      const result = await this.knex.raw(query);

      return true;
    } catch (error) {
      console.log('No se puede porque tiene intercambios');
      return false;
    }
  }

  async getMusicalExchange(musicalgroupId: number) {
    try {
      let query = `SELECT * FROM MusicalExchange 
                       WHERE (idMGroupA=${musicalgroupId} OR idMGroupB=${musicalgroupId})
                              AND date >= CURRENT_TIMESTAMP`;

      const result = await this.knex.raw(query);
      return result[0];
    } catch (error) {
      console.log('Error en consulta getMusicalExchange(id)');
    }
  }
}
