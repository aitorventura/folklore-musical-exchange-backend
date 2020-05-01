import { Injectable } from '@nestjs/common';
import { PersonDto } from './person.dto';
import { PersonDataBaseConnection } from './person.database';
import { Cloudinary } from '../cloudinary/cloudinary';

@Injectable()
export class PersonService {
  constructor(private readonly dataBase: PersonDataBaseConnection) { }
  async getPeople() {
    return await this.dataBase.getPeople();
  }

  async getPerson(id: number) {
    return await this.dataBase.getPerson(id);
  }

  async createPerson(personDto: PersonDto) {
    var cloudinary = new Cloudinary()
    if(personDto.image){
      var url = await cloudinary.uploadImage(personDto.image, personDto.username + "/profileImage/")
      personDto.image = url
     }

    return this.dataBase.addNewPerson(personDto);
  }

  async updatePerson(personDto: PersonDto) {
  
    var cloudinary = new Cloudinary()
    
      var url = await cloudinary.uploadImage(personDto.image, personDto.username + "/profileImage/")
      
      if(url) {
        personDto.image = url
      }
     
    return this.dataBase.updatePerson(personDto);
  }

  deletePerson(id: number) {
    return this.dataBase.deletePerson(id);
  }
}
