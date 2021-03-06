import { MusicalGroupDto } from './musicalgroup.dto';
import { UserDataBaseConnection } from 'src/user/user.database';
import { EmailService } from '../shared/services/email.service';
import { Injectable } from '@nestjs/common';
import { PersonDataBaseConnection } from '../person/person.database';

@Injectable()
export class MusicalGroupDataBaseConnection extends UserDataBaseConnection {
  knex;
  constructor(private readonly emailService: EmailService) {
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
    return result;
  }

  async getOthersMusicalGroups(id: number) {
    const result = await this.knex
      .select('*')
      .from('MGroup')
      .innerJoin('User', 'MGroup.id', 'User.id')
      .where(this.knex.raw(`MGroup.id != ${id}`));
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
    console.log('musicalgroupDto.image: ', musicalgroupDto.image);
    musicalgroupDto.role = 'MGROUP';

    const isAdded = await this.addNewUser(musicalgroupDto);
    if (isAdded != 0) {
      //Si ha habido un problema devuelvo el código
      return isAdded;
    }

    let idUser = await this.getIdUserByEmail(musicalgroupDto.email);

    let query = `INSERT INTO MGroup(id, name, description,members,nameType)
    VALUES (${idUser} ,  '${musicalgroupDto.name}' , '${musicalgroupDto.description}' , ${musicalgroupDto.members} , '${musicalgroupDto.nameType}')`;

    try {
      await this.knex.raw(query);
      this.emailService.sendWelcomeEmail(
        musicalgroupDto.email,
        musicalgroupDto.name,
      );
      const emails = await this.getEmailsOfUsersSuscriptedToAType(
        musicalgroupDto.nameType,
      );
      this.emailService.sendNewGroupOfType(
        emails,
        musicalgroupDto.name,
        musicalgroupDto.nameType,
      );

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
    const updated = await this.updateUser(musicalGroupDto);

    if (updated != 0) {
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
      return 4;
    }
  }

  async deleteMusicalGroup(musicalgroupId: number) {
    try {
      if ((await this.getMusicalExchange(musicalgroupId)).length > 0) {
        console.log(
          'No se puede eliminar porque tiene un intercambio pendiente',
        );
        return false;
      }
      let query = `UPDATE User SET dateUnsubscribe = CURRENT_TIMESTAMP WHERE id=${musicalgroupId}`;
      const result = await this.knex.raw(query);

      return true;
    } catch (error) {
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

  async getEmailsOfUsersSuscriptedToAType(type: string): Promise<string[]> {
    let query = await this.knex('User')
      .select('User.email')
      .innerJoin('Person', 'User.id', 'Person.id')
      .innerJoin('TypeSubscription', 'Person.id', 'TypeSubscription.idPerson')
      .where(this.knex.raw(`TypeSubscription.nameType = '${type}'`));

    var result = [];

    for (var obj of query) {
      result.push(obj.email);
    }
    return result;
  }
}
