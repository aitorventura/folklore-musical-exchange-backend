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

  async getChat(id: number) {
    return await this.dataBase.getChat(id);
  }

  async getMyself(id: number) {
    return await this.dataBase.getMyself(id);
  }

  async getParticipant(idChat: number, id: number) {
    return await this.dataBase.getParticipant(idChat, id);
  }

  async createMessage(idChat: number, messageDto: MessageDto) {
    return await this.dataBase.createMessage(idChat, messageDto);
  }

  async createChat(chatDto: ChatDto) {
    return this.dataBase.addNewMessage(chatDto);
  }
}
