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
    /*
    SALIDA 0: Todo funciona correctamente
    SALIDA 1: Ya existe ese email
    SALIDA 2: Ya existe ese username
    SALIDA 3: Error al crear el usuario
    SALIDA 4: Error al crear la agrupación
    */
    //musicalgroupDto.image = null;
    musicalgroupDto.role = 'MGROUP';
    console.log("Nombre imagen: ", musicalgroupDto.image.name);

    const isAdded = await this.addNewUser(musicalgroupDto);
    console.log('Resultado isadded: ' + isAdded);
    if (isAdded != 0) {
      //Si ha habido un problema devuelvo el código
      //console.log('Return: ' + isAdded);
      return isAdded;
    }

    let idUser = await this.getIdUserByEmail(musicalgroupDto.email);

    let query = `INSERT INTO MGroup(id, name, description,members,nameType)
    VALUES (${idUser} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , ${musicalgroupDto.members} , '${musicalgroupDto.nameType}')`;

    try {
      await this.knex.raw(query);
      return 0;
    } catch (error) {
      return 4;
    }
  }

  async updateMusicalGroup(musicalGroupDto: MusicalGroupDto) {
    /*
    SALIDA 0: Todo funciona correctamente
    SALIDA 1: Ya existe ese email
    SALIDA 2: Ya existe ese username
    SALIDA 3: Error al modificar el usuario
    SALIDA 4: Error al modificar la agrupación
    */

    musicalGroupDto.role = 'MGROUP';
    console.warn("Nombre imagen: ", musicalGroupDto.image.name);
    const updated = await this.updateUser(musicalGroupDto);
    //console.log('Resultado: ' + updated);
    if (updated != 0) {
      //  console.log('Resultado: ' + updated);
      //Si ha habido un problema devuelvo el código
      return updated;
    }

    let query = `UPDATE MGroup SET name = '${musicalGroupDto.name}',
                      description = '${musicalGroupDto.description}', 
                      members = ${musicalGroupDto.members}, 
                      nameType = '${musicalGroupDto.nameType}' 
                    WHERE id = ${musicalGroupDto.id}`;
    try {
      if (updated === 0) {
        await this.knex.raw(query);
        return 0;
      }
    } catch (error) {
      //  console.log('Error update mgroup');
      return 4;
    }
  }

  async deleteMusicalGroup(musicalgroupId: number) {
    try {
      if ((await this.getMusicalExchange(musicalgroupId)).length > 0) {
        console.log('No se puede eliminar porque tiene un intercambio pendiente');
        //TODO: Tiene que saltar una excepción para mostrársela al usuario
        return false;
      }
      let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${musicalgroupId}`;
      const result = await this.knex.raw(query);

      return true;
    } catch (error) {
      //  console.log('No se puede porque tiene intercambios');
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
