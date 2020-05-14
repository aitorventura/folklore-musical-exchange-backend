import { Injectable } from '@nestjs/common';
import { ChatDto } from './chat.dto';
import { DataBaseConnection } from '../app.database';
import { ChatDataBaseConnection } from './chat.database';

@Injectable()
export class ChatService {
  constructor(private readonly dataBase: ChatDataBaseConnection) {}

  async getChats(id: number) {
    return await this.dataBase.getChats(id);
  }

  async getChat(id: number) {
    return await this.dataBase.getChat(id);
  }

  async getMyself(id: number) {
    return await this.dataBase.getMyself(id);
  }

  async getParticipant(idChat: number, id: number) {
    return await this.dataBase.getParticipant(idChat, id);
  }

  createChat(chatDto: ChatDto) {
    return this.dataBase.addNewMessage(chatDto);
  }
}
