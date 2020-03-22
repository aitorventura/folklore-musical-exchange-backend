import { TypeDto } from './type.dto';
import { DataBaseConnection } from 'src/app.database';

export class TypeDataBaseConnection extends DataBaseConnection {
  async getTypes() {
    const result = await this.knex.select('*').from('Type');
    return result;
  }

  /* No es necesario
  async getNameTypes() {
    console.log('Get Names Types BBDD');
    const result = await this.knex.select('name').from('Type');
    return result;
  }
  */

  async getType(name: string) {
    const result = await this.knex
      .select('*')
      .from('Type')
      .where({ 'Type.name': `${name}` });
    console.log('getType(name) de la BBDD: ' + result);
    return result;
  }

  async addType(typeDto: TypeDto) {
    try {
      let query = `INSERT INTO Type(name, description)
    VALUES (${typeDto.name} ,  '${typeDto.description}')`;

      await this.knex.raw(query);
      return true;
    } catch (error) {
      //Intentan introducir un tipo ya registrado
      return false;
    }
  }

  async updateType(typeDto: TypeDto) {
    let query = `UPDATE Type SET description = '${typeDto.description}' , name = '${typeDto.name}'
                WHERE name = '${typeDto.name}'`;

    try {
      await this.knex.raw(query);
      return true;
    } catch (error) {
      console.log(
        'Error al intentar actualziar type - mirar si se puede cambiar nombre',
      );
      return false;
    }
  }

  async deleteType(name: string) {
    try {
      let query = `DELETE FROM Type WHERE name=${name}`;

      console.log('Delete type query ' + query);
      const result = await this.knex.raw(query);
      return true;
    } catch (error) {
      console.log('Error al intentar borrar type');
      return false;
    }
  }
}
