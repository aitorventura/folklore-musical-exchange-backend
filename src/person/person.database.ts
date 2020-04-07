import { PersonDto } from './person.dto';
import { UserDataBaseConnection } from 'src/user/user.database';

export class PersonDataBaseConnection extends UserDataBaseConnection {
    knex;
    constructor() {
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
        personDto.image = null;
        personDto.role = 'PERSON';

        const isAdded = await this.addNewUser(personDto);
        if(!isAdded){
            return false;
        }

        let idUser = await this.getIdUserByEmail(personDto.email);

        let query = `INSERT INTO Person(id, name, surname)
    VALUES (${idUser} ,  '${personDto.name}' , '${personDto.surname}')`;

        try {  
            await this.knex.raw(query);
               return true;    
        } catch(error) {
            return false;
        }
    }

    async updatePerson(personDto: PersonDto) {
        personDto.image = null;
        personDto.role = 'PERSON';

        const updated = await this.updateUser(personDto);

        try {
            if (updated) {
                let query = `UPDATE Person SET name='${personDto.name}', 
                      surname = '${personDto.surname}' 
                    WHERE id = ${personDto.id}`;
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