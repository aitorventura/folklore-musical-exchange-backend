import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ChatDto } from '../chat/chat.dto';
import { MessageDto } from '../chat/message.dto';
import { ChatService } from '../chat/chat.service';
import { ChatDataBaseConnection } from './chat.database';
/*
import { AuthGuard } from '../guards/auth.guard';
import { Requester } from '../shared/entities/requester';
import { AuthUser } from '../shared/decorators/requester.decorator';
import { RequesterRole } from '../shared/enums/requester-role.enum';
*/

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Se obtienen todos los chats en los que participa un usuario
   */
  @Get('/all/:id')
  async getChats(@Param('id') id: number) {
    return await this.chatService.getChats(id);
  }

  /**
   * Se obtienen los mensajes de un chat con una persona
   * @param id del chat
   */
  @Get(':id')
  async getChat(@Param('id') id: number) {
    const result = await this.chatService.getChat(id);
    return result;
  }
  /**
   * Se obtienen los datos del receptor
   * @param id del usuario en sesión
   */
  @Get('/myself/:id')
  async getMyself(@Param('id') id: number) {
    const result = await this.chatService.getMyself(id);
    return result[0];
  }

  /**
   *
   * @param idChat
   * @param id
   */
  @Get('participant/:idChat/:id')
  async getParticipant(
    @Param('idChat') idChat: number,
    @Param('id') id: number,
  ) {
    const result = await this.chatService.getParticipant(idChat, id);
    return result;
  }

  @Post('/newmsg/:idChat')
  async createMessage(
    @Param('idChat') idChat: number,
    @Body() messageDto: MessageDto,
  ) {
    /*console.log('Controlador: ');
    console.log(
      'CONTROLADOR... id: ' +
        idChat +
        ' content: ' +
        messageDto.content +
        ' partId: ' +
        messageDto.participantId +
        ' timestamp: ' +
        messageDto.timestamp,
    );*/

    return await this.chatService.createMessage(idChat, messageDto);
  }

  /*
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteChat(@AuthUser() requester: Requester, @Param('id') id: string) {
    if (requester.role !== RequesterRole.MGROUP) {
      throw new ForbiddenException();
    }

    const listExchanges = await new ChatDataBaseConnection().getChatMGroup(
      requester.id,
    );
    const array = [];
    listExchanges.forEach(element => {
      array.push(element.id);
    });

    if (!array.includes(parseInt(id))) {
      throw new ForbiddenException();
    }

    return this.chatService.deleteChat(parseInt(id));
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  async updateChat(
    @AuthUser() requester: Requester,
    @Param('id') id: string,
    @Body() musicalExchangeDto: ChatDto,
  ) {
    if (requester.role !== 'MGROUP') {
      throw new ForbiddenException();
    }

    const listExchanges = await new ChatDataBaseConnection().getChatMGroup(
      requester.id,
    );
    const array = [];
    listExchanges.forEach(element => {
      array.push(element.id);
    });

    if (!array.includes(parseInt(id))) {
      throw new ForbiddenException();
    }

    musicalExchangeDto.id = parseInt(id);
    return this.chatService.updateChat(musicalExchangeDto);
  }*/
}
