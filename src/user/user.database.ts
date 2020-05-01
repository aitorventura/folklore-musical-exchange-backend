import { UserDto } from './user.dto';
import { DataBaseConnection } from 'src/app.database';

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

      console.log('Total resultados con email ' + userDto.email + ': ' + result.length);
      if (result.length > 0) {

        return 1;
      }
    } catch (error) {

      return 3;
    }

    console.log("user.database.addNewUser, comprobar si existe el username")
    try {
      const result = await this.knex.select()
        .from("User")
        .where({ "username": `${userDto.username}` });

      console.log('Total resultados con username ' + userDto.username + ': ' + result.length);
      if (result.length > 0) {
    
        return 2;
      }
    } catch (error) {
      return 3;
    }
    console.log("user.database.addNewUser, inserto en la tabla user")
    try {
     
      if(!userDto.image){
        var randomNumber : number = this.randomInt(0, 4);
        switch(randomNumber){
          case 0:
            userDto.image = "http://res.cloudinary.com/dc82hcjha/image/upload/v1588351463/logoAzul/profileImage/dkuwccnisehjloeiqahb.png"
            break;
          case 1:
            userDto.image = "http://res.cloudinary.com/dc82hcjha/image/upload/v1588351496/logoAmarillo/profileImage/yyi5ecedmobxk79re9bv.png"
            break;
          case 2:
            userDto.image = "http://res.cloudinary.com/dc82hcjha/image/upload/v1588351756/huevoMorado/profileImage/ztjw7vmikau0cv8r4giy.png"
            break;
          case 3:
            userDto.image = "http://res.cloudinary.com/dc82hcjha/image/upload/v1588351819/huevoRojo/profileImage/dpoyhcoksxs0ycajr2us.png"
            break;
          case 4:
            userDto.image = "http://res.cloudinary.com/dc82hcjha/image/upload/v1588351846/huevoVerde/profileImage/lqh3o0ltfxzmtj5tozbb.png"
            break;

          }
      }
      let query = `INSERT INTO User(role, email, username, password, city, image) VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', '${userDto.image}')`;
      await this.knex.raw(query);
      return 0;
    } catch (error) {
      console.log(error);
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
      console.log(error)
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
      console.log(error)
      console.log('Error al ver si ya existe ese usuario');
      return 3;
    }

    console.log(userDto.image)
    if(userDto.image){
      let query = `UPDATE User SET email = '${userDto.email}' , username = '${userDto.username}', city = '${userDto.city}', image =  '${userDto.image}'
                      WHERE id = '${userDto.id}'`;
          try {
            await this.knex.raw(query);
            return 0;
          } catch (error) {
            console.log('Error al actualizar el usuario');
            console.log(error)
            return 3;
          }
    } else {
        let query = `UPDATE User SET email = '${userDto.email}' , username = '${userDto.username}', city = '${userDto.city}' 
                              WHERE id = '${userDto.id}'`;
                  try {
                    await this.knex.raw(query);
                    return 0;
                  } catch (error) {
                    console.log('Error al actualizar el usuario');
                    console.log(error)
                    return 3;
                  }


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

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
