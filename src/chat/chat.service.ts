import { Injectable } from '@nestjs/common';
import { ChatDto } from './chat.dto';
import { MessageDto } from './message.dto';
import { DataBaseConnection } from '../app.database';
import { ChatDataBaseConnection } from './chat.database';

@Injectable()
export class ChatService {
  constructor(private readonly dataBase: ChatDataBaseConnection) {}

  async getChats(id: number) {
    return await this.dataBase.getChats(id);
  }

  async getChat(idA: number, idB: number) {
    return await this.dataBase.getChat(idA, idB);
  }

  async getMyself(id: number) {
    return await this.dataBase.getMyself(id);
  }

  async getParticipant(id: number) {
    console.log('Servicio');
    return await this.dataBase.getParticipant(id);
  }

  async createMessage(idA: number, idB: number, messageDto: MessageDto) {
    return await this.dataBase.createMessage(idA, idB, messageDto);
  }
}
