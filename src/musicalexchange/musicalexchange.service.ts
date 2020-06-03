import { Injectable } from '@nestjs/common';
import { MusicalExchangeDto } from './musicalexchange.dto';
import { MusicalExchangeDataBaseConnection } from './musicalexchange.database';

@Injectable()
export class MusicalExchangeService {
  constructor(private readonly dataBase: MusicalExchangeDataBaseConnection) { }

  async getMusicalExchanges() {
    return await this.dataBase.getMusicalExchanges();
  }

  async getMusicalExchange(id: number) {
    return await this.dataBase.getMusicalExchange(id);
  }

  createMusicalExchange(musicalexchangeDto: MusicalExchangeDto) {
    return this.dataBase.addNewMusicalExchange(musicalexchangeDto);
  }

  updateMusicalExchange(musicalexchangeDto: MusicalExchangeDto) {
    return this.dataBase.updateMusicalExchange(musicalexchangeDto);
  }

  deleteMusicalExchange(musicalexchangeId: number) {
    return this.dataBase.deleteMusicalExchange(musicalexchangeId);
  }
}
