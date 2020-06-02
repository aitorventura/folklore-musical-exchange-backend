import { Injectable } from '@nestjs/common';
import { TypeDto } from './type.dto';
import { TypeDataBaseConnection } from './type.database';

@Injectable()
export class TypeService {
  constructor(private readonly dataBase: TypeDataBaseConnection) {}

  async getTypes() {
    return await this.dataBase.getTypes();
  }

  async getType(name: string) {
    return await this.dataBase.getType(name);
  }

  createType(typeDto: TypeDto) {
    this.dataBase.addType(typeDto);
  }

  updateType(typeDto: TypeDto) {
    this.dataBase.updateType(typeDto);
  }

  deleteType(name: string) {
    this.dataBase.deleteType(name);
  }
}
