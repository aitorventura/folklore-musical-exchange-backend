import { Injectable } from '@nestjs/common';
import { MusicalGroupDto } from './musicalgroup.dto';
import { DataBaseConnection } from '../app.database';
import { MusicalGroupDataBaseConnection } from './musicalgroup.database';

@Injectable()
export class MusicalGroupService {
  constructor(private readonly dataBase: MusicalGroupDataBaseConnection) { }

  async getMusicalGroups() {
    return await this.dataBase.getGroups();
  }

  async getMusicalGroup(id: number) {
    return await this.dataBase.getMusicalGroup(id);
  }

  createMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    this.dataBase.addNewMusicalGroup(musicalgroupDto);
  }

  updateMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    this.dataBase.updateMusicalGroup(musicalgroupDto);
  }

  deleteMusicalGroup(musicalgroupId: number) {
    this.dataBase.deleteMusicalGroup(musicalgroupId);
  }
}
