import { PersonDto } from './person.dto';
import { UserDataBaseConnection } from 'src/user/user.database';
import { EmailService } from '../shared/services/email.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PersonDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor(private readonly emailService: EmailService) {
    super();
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

  async addNewPerson(personDto: PersonDto) {
    /*
    SALIDA 0: Todo funciona correctamente
    SALIDA 1: Ya existe ese email
    SALIDA 2: Ya existe ese username
    SALIDA 3: Error al añadir el usuario
    SALIDA 4: Error al añadir la persona
    */
    personDto.role = 'PERSON';

    const isAdded = await this.addNewUser(personDto);
    if (isAdded != 0) {
      //Si ha habido un problema devuelvo el código
      console.log('Return: ' + isAdded);
      return isAdded;
    }

    let idUser = await this.getIdUserByEmail(personDto.email);

    let query = `INSERT INTO Person(id, name, surname)
    VALUES (${idUser} ,  '${personDto.name}' , '${personDto.surname}')`;

    try {
      await this.knex.raw(query);
      console.log("Voy a mandar el email")
      console.log(this.emailService)
      this.emailService.sendWelcomeEmail(personDto.email, personDto.name)
      return 0;
    } catch (error) {
      return 4;
    }
  }

  async updatePerson(personDto: PersonDto) {
    /*
    SALIDA 0: Todo funciona correctamente
    SALIDA 1: Ya existe ese email
    SALIDA 2: Ya existe ese username
    SALIDA 3: Error al modificar el usuario
    SALIDA 4: Error al modificar la persona
    */
    personDto.role = 'PERSON';
    
    const updated = await this.updateUser(personDto);
    if (updated != 0) {
      console.log('Resultado: ' + updated);
      //Si ha habido un problema devuelvo el código
      return updated;
    }
    try {
      if (updated === 0) {
        let query = `UPDATE Person SET name='${personDto.name}', 
                      surname = '${personDto.surname}' 
                    WHERE id = ${personDto.id}`;
        await this.knex.raw(query);
        return 0;
      }
    } catch (error) {
      console.log('Error update person');
      return 4;
    }
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
}
