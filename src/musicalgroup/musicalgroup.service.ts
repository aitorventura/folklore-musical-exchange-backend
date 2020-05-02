import { Injectable } from '@nestjs/common';
import { MusicalGroupDto } from './musicalgroup.dto';
import { DataBaseConnection } from '../app.database';
import { MusicalGroupDataBaseConnection } from './musicalgroup.database';
import { Cloudinary } from "../cloudinary/cloudinary"

@Injectable()
export class MusicalGroupService {
  constructor(private readonly dataBase: MusicalGroupDataBaseConnection) { }

  async getMusicalGroups() {
    return await this.dataBase.getGroups();
  }

  async getMusicalGroup(id: number) {
    return await this.dataBase.getMusicalGroup(id);
  }

  async getOthersMusicalGroups(id: number) {
    return await this.dataBase.getOthersMusicalGroups(id);
  }

  async createMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    var cloudinary = new Cloudinary()

    if(musicalgroupDto.image){
      var url = await cloudinary.uploadImage(musicalgroupDto.image, musicalgroupDto.username + "/profileImage/")
      musicalgroupDto.image = url
     }
    return this.dataBase.addNewMusicalGroup(musicalgroupDto);
  }

  async updateMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    var cloudinary = new Cloudinary()
    
      var url = await cloudinary.uploadImage(musicalgroupDto.image, musicalgroupDto.username + "/profileImage/")
      
      if(url) {
        musicalgroupDto.image = url
      }


    return this.dataBase.updateMusicalGroup(musicalgroupDto);
  }

  deleteMusicalGroup(musicalgroupId: number) {
    return this.dataBase.deleteMusicalGroup(musicalgroupId);
  }
}
