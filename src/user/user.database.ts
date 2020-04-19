import { UserDto } from './user.dto';
import { DataBaseConnection } from 'src/app.database';
import { createHash } from 'crypto';

export class UserDataBaseConnection extends DataBaseConnection {
  knex;
  constructor() {
    super();
  }

  async addNewUser(userDto: UserDto) {
    console.log("user.database.addNewUser, comprobar si existe el email")
    try {
      const result = await this.knex.select()
        .from("User")
        .where({ 'email': `${userDto.email}` });
      //let query = `SELECT * FROM User WHERE email='${userDto.email}'`;
      //console.log('Query: ' + query);
      //const result = await this.knex.raw(query);

      //console.log('result[0]: ' + result[0].length);
      console.log('Total resultados con email ' + userDto.email + ': ' + result.length);
      if (result.length > 0) {
        //if (result[0] != null && result[0].length > 0) {
        //  console.log('addUser res: return 1');
        return 1;
      }
    } catch (error) {
      //console.log('Error con el select email');
      return 3;
    }

    console.log("user.database.addNewUser, comprobar si existe el username")
    try {
      const result = await this.knex.select()
        .from("User")
        .where({ "username": `${userDto.username}` });
      //let query = `SELECT * FROM User WHERE username='${userDto.username}'`;
      //console.log('query: ' + query);
      //const result = await this.knex.raw(query);
      //console.log('result[0]: ' + result[0].length);
      //console.log('result: ' + result.length);
      console.log('Total resultados con username ' + userDto.username + ': ' + result.length);
      if (result.length > 0) {
        //if (result[0].length > 0) {
        //  console.log('addUser res: return 2');
        return 2;
      }
    } catch (error) {
      //console.log('Error al ver si ya existe ese usuario');
      return 3;
    }
    console.log("user.database.addNewUser, inserto en la tabla user")
    try {
      /*await this.knex("User").insert({
        "username": userDto.username,
        "email": userDto.email,
        "password": AES_ENCRYPT(userDto.password, "fme"),
        "role": userDto.role,
        "city": userDto.city,
        "image": userDto.image
      }).then(() => {})*/
      let query = `INSERT INTO User(role, email, username, password, city, image) VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', ${userDto.image})`;
      console.log('user.database.addNewUser, Query: ' + query);
      await this.knex.raw(query);
      return 0;
    } catch (error) {
      console.log(error);
      //console.log('Error al crear el usuario');
      return 3;
    }
  }

  async updateUser(userDto: UserDto) {
    try {
      let query = `SELECT * FROM User WHERE email='${userDto.email}' AND id NOT IN (${userDto.id})`;
      const result = await this.knex.raw(query);
      if (result[0].length > 0) {
        return 1;
      }
    } catch (error) {
      console.log('Error al ver si ya existe ese email');
      return 3;
    }

    try {
      let query = `SELECT * FROM User WHERE username='${userDto.username}' AND id NOT IN (${userDto.id})`;
      const result = await this.knex.raw(query);
      if (result[0].length > 0) {
        return 2;
      }
    } catch (error) {
      console.log('Error al ver si ya existe ese usuario');
      return 3;
    }

    let query = `UPDATE User SET email = '${userDto.email}' , username = '${userDto.username}', city = '${userDto.city}', image =  ${userDto.image}
                WHERE id = '${userDto.id}'`;
    try {
      await this.knex.raw(query);
      return 0;
    } catch (error) {
      console.log('Error al actualizar el usuario');
      return 3;
    }
  }

  async deletePerson(id: number) {
    try {
      let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${id}`;

      console.log('query ' + query);
      const result = await this.knex.raw(query);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getIdUserByEmail(email: string) {
    let query = `SELECT id FROM User WHERE email = '${email}'`;

    const result = await this.knex.raw(query);

    const idPerson = result[0].map(x => x.id);

    return idPerson;
  }
}
