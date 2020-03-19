import { Injectable } from '@nestjs/common';
import { MusicalGroupDto } from './musicalgroup.dto';
import { DataBaseConnection } from '../app.database';

@Injectable()
export class MusicalGroupService {
  constructor(private readonly dataBase: DataBaseConnection) {}

  getMusicalGroup() {
    return this.dataBase.getGroups();
  }

  createMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    this.dataBase.addNewMusicalGroup(musicalgroupDto);
  }

  setMusicalGroup(musicalgroupDto: MusicalGroupDto) {
    this.dataBase.setMusicalGroup(musicalgroupDto);
  }

  deleteMusicalGroup(musicalgroupId: number) {
    this.dataBase.deleteMusicalGroup(musicalgroupId);
  }
}
