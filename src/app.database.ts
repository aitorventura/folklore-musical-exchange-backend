import { PersonDto } from './person/person.dto';
import { MusicalGroupDto } from './musicalgroup/musicalgroup.dto';
import { UserDto } from './user/user.dto';

export class DataBaseConnection {
  knex;
  constructor() {
    this.knex = require('knex')({
      client: 'mysql',
      connection: {
        host: 'remotemysql.com',
        user: 'pSPx3t9HCI',
        password: 'kFe4CAqbVr',
        database: 'pSPx3t9HCI',
      },
    });
  }
}
  /*
async getGroups() {
  const result = await this.knex
    .select('*')
    .from('MGroup')
    .innerJoin('User', 'MGroup.id', 'User.id')
    .where({ 'User.dateUnsubscribe': null });
  return result;
}

async getPeople() {
  const result = await this.knex
    .select('*')
    .from('Person')
    .innerJoin('User', 'Person.id', 'User.id')
    .where({ 'User.dateUnsubscribe': null });
  return result;
}

async getPerson(id: number) {
  const result = await this.knex
    .select('*')
    .from('Person')
    .innerJoin('User', 'Person.id', 'User.id')
    .where({ 'Person.id': `${id}` });
  console.log(result);
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

async addNewPerson(personDto: PersonDto) {
  personDto.image = null;
  personDto.role = 'PERSON';

  await this.addNewUser(personDto);

  let idUser = await this.getIdUserByEmail(personDto.email);

  let query = `INSERT INTO Person(id, name, surname)
  VALUES (${idUser} ,  '${personDto.name}' , '${personDto.surname}')`;

  await this.knex.raw(query);
}

async updateUser(userDto: UserDto) {
  console.log('Entro a cambiar user');
  let query = `UPDATE User SET email = '${userDto.email}' , username = '${userDto.username}', city = '${userDto.city}', image =  ${userDto.image}
              WHERE id = '${userDto.id}'`;

  try {
    await this.knex.raw(query);
    return true;
  } catch (error) {
    return false;
  }
}

async updatePerson(personDto: PersonDto) {
  personDto.image = null;
  personDto.role = 'PERSON';

  const updated = this.updateUser(personDto);

  let query = `UPDATE Person SET name='${personDto.name}',
                surname = '${personDto.surname}'
              WHERE id = ${personDto.id}`;

  try {
    if (updated) {
      await this.knex.raw(query);
      return true;
    } else {
      console.log('No se ha actualizado user');
      return false;
    }
  } catch (error) {
    console.log('Error update person');
    return false;
  }
}

async updateMusicalGroup(musicalGroupDto: MusicalGroupDto) {
  musicalGroupDto.image = null;
  musicalGroupDto.role = 'MGROUP';

  const updated = this.updateUser(musicalGroupDto);

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
    console.log('Error update mgroup - revisar nameType');
    //TODO: Si falla es porque no encuentra el nameType, hay que hacer un desplegable
    return false;
  }
}

/* Musical Groups */
/*
async addNewMusicalGroup(musicalgroupDto: MusicalGroupDto) {
  musicalgroupDto.image = null;
  musicalgroupDto.role = 'MGROUP';

  this.addNewUser(musicalgroupDto);
  let idUser = await this.getIdUserByEmail(musicalgroupDto.email);

  let query = `INSERT INTO MGroup(id, name, description,members,nameType)
  VALUES (${idUser} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , '${musicalgroupDto.members}' , '${musicalgroupDto.nameType}')`;

  await this.knex.raw(query);
  console.log(query);
  //FIXME: devolver true/false y añadir realmente a la BBDD
}

async deleteMusicalGroup(musicalgroupId: number) {
  try {
    if ((await this.getMusicalExchange(musicalgroupId)).length > 0) {
      //Tiene más de un intercambio
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
  //FIXME: devolver true/false
}

async deletePerson(id: number) {
  try {
    console.log('Entro en la BBDD');
    let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${id}`;

    console.log('query ' + query);
    const result = await this.knex.raw(query);
    return true;
  } catch (error) {
    return false;
  }
}

/* ---------------------- */
/*
async addNewUser(userDto: UserDto) {
  try {
    let query = `INSERT INTO User(role, email, username, password, city, image)
              VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', ${userDto.image})`;

    const result = await this.knex.raw(query);

    return true;
  } catch (error) {
    return false;
  }

  //FIXME: devolver true/false y añadir realmente a la BBDD
}

async getIdUserByEmail(email: string) {
  let query = `SELECT id FROM User WHERE email = '${email}'`;

  const result = await this.knex.raw(query);

  const idPerson = result[0].map(x => x.id);

  return idPerson;
}

async getMusicalExchange(musicalgroupId: number) {
  try {
    let query = `SELECT * FROM MusicalExchange
                 WHERE (idMGroupA=${musicalgroupId} OR idMGroupB=${musicalgroupId})
                        AND date >= CURRENT_TIMESTAMP`;
    const result = await this.knex.raw(query);
    return result;
  } catch (error) {
    console.log('Error en consulta getMusicalExchange(id)');
  }
}*/


//getGroups().finally(() => knex.destroy());
