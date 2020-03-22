import { UserDto } from './user.dto';
import { DataBaseConnection } from 'src/app.database';

export class UserDataBaseConnection extends DataBaseConnection {
    knex;
    constructor() {
        super();
    }

    async addNewUser(userDto: UserDto) {
        try {
            let query = `INSERT INTO User(role, email, username, password, city, image)
                VALUES ( '${userDto.role}' ,  '${userDto.email}' , '${userDto.username}', AES_ENCRYPT('${userDto.password}', 'fme') , '${userDto.city}', ${userDto.image})`;

            const result = await this.knex.raw(query);

            return true;
        } catch (error) {
            return false;
        }
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

    async getIdUserByEmail(email: string) {
        let query = `SELECT id FROM User WHERE email = '${email}'`;

        const result = await this.knex.raw(query);

        const idPerson = result[0].map(x => x.id);

        return idPerson;
    }
}