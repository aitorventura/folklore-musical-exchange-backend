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
    return this.dataBase.addNewMusicalGroup(musicalgroupDto);
  }

  updateMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    return this.dataBase.updateMusicalGroup(musicalgroupDto);
  }

  deleteMusicalGroup(musicalgroupId: number) {
    return this.dataBase.deleteMusicalGroup(musicalgroupId);
  }
}
