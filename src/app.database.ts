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

  async getGroups() {
    const result = await this.knex
      .select('*')
      .from('MGroup')
      .innerJoin('User', 'MGroup.id', 'User.id');
    console.log(result);
    return result;
  }

  async getPeople() {
    const result = await this.knex
      .select('*')
      .from('Person')
      .innerJoin('User', 'Person.id', 'User.id');
    console.log(result);
    return result;
  }
  
  async addNewPerson(personDto: PersonDto) {
    personDto.image = null;
    personDto.role = 'PERSON';

    await (this.addNewUser(personDto));

    let idUser = (await this.getIdUserByEmail(personDto.email));


    let query = `INSERT INTO Person(id, name, surname)
    VALUES (${idUser} ,  '${personDto.name}' , '${personDto.surname}')`;


    await (this.knex.raw(query));
    
  }

  /* Musical Groups */
  async addNewMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    musicalgroupDto.image = null;
    musicalgroupDto.role = 'MGROUP';

    this.addNewUser(musicalgroupDto);
    let idUser = await this.getIdUserByEmail(musicalgroupDto.email);

    let query = `INSERT INTO MGroup(id, name, description,members,nameType)
    VALUES (${idUser} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , '${musicalgroupDto.members}' , '${musicalgroupDto.nameType}')`;

    console.log(query);
    //FIXME: devolver true/false y añadir realmente a la BBDD
  }

  setMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    let query = `INSERT INTO MGroup(id, name, description,members,nameType)
    VALUES (${musicalgroupDto.id} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , '${musicalgroupDto.members}' , '${musicalgroupDto.nameType}')`;
    console.log(query);
    //FIXME: devolver true/false y añadir realmente a la BBDD
  }

  async deleteMusicalGroup(musicalgroupId: number) {
    let query = `DELETE FROM MGroup WHERE id = ${musicalgroupId}`;
    //FIXME: devolver true/false
  }

  /* ---------------------- */

  async addNewUser(userDto: UserDto){
    
    try{
        let query = `INSERT INTO User(role, email, username, password, city, image)
                VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', ${userDto.image})`;

        
        const result = await this.knex.raw(query);

        return true;
    
    
    
     } catch(error){
        return false;
    };
    
 
    //FIXME: devolver true/false y añadir realmente a la BBDD
  }

  async getIdUserByEmail(email: string) {
    let query = `SELECT id FROM User WHERE email = '${email}'`;


    const result = await this.knex.raw(query);

    const idPerson = result[0].map(x => x.id);

    return idPerson;
  }
}

//getGroups().finally(() => knex.destroy());
