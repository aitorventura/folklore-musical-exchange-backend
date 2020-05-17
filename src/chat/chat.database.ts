import { ChatDto } from './chat.dto';
import { MessageDto } from './message.dto';
import { DataBaseConnection } from 'src/app.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatDataBaseConnection extends DataBaseConnection {
  knex;

  /**
   * Se obtienen los chats de un usuario
   * @param id del usuario
   */
  async getChats(id: number) {
    //console.log('getChats BBDD TODOS');
    try {
      let query = `SELECT Chat.id, Chat.idA, Chat.idB,
      CASE
      WHEN Chat.idA = ${id} THEN 
        CASE 
          WHEN MGroupB.name IS NOT NULL THEN MGroupB.name 
          WHEN PersonB.name IS NOT NULL THEN PersonB.name
        END
      ELSE    
        CASE 
          WHEN MGroupA.name IS NOT NULL THEN MGroupA.name 
          WHEN PersonA.name IS NOT NULL THEN PersonA.name
        END
      END AS 'name'                    
      FROM Chat LEFT JOIN MGroup AS MGroupA ON MGroupA.id=Chat.idA LEFT JOIN MGroup AS MGroupB ON MGroupB.id=Chat.idB 
        LEFT JOIN Person AS PersonA ON PersonA.id=Chat.idA LEFT JOIN Person AS PersonB ON PersonB.id=Chat.idB
      WHERE Chat.idA=${id} OR Chat.idB=${id}`;

      /*`SELECT Chat.id, Chat.idA, Chat.idB, 
                      CASE 
                        WHEN MGroupA.name IS NOT NULL THEN MGroupA.name 
                        WHEN PersonA.name IS NOT NULL THEN PersonA.name
                      END AS 'nombreA'
                      ,CASE 
                        WHEN MGroupB.name IS NOT NULL THEN MGroupB.name 
                        WHEN PersonB.name IS NOT NULL THEN PersonB.name
                      END AS 'nombreB'
                    FROM Chat LEFT JOIN MGroup AS MGroupA ON MGroupA.id=Chat.idA LEFT JOIN MGroup AS MGroupB ON MGroupB.id=Chat.idB 
                      LEFT JOIN Person AS PersonA ON PersonA.id=Chat.idA LEFT JOIN Person AS PersonB ON PersonB.id=Chat.idB
                    WHERE Chat.idA=${id} OR Chat.idB=${id}`;*/

      const result = await this.knex.raw(query);
      //console.log('Se obtienen los chats');
      return result[0];
    } catch (error) {
      console.log('Error al obtener los chats.');
    }
  }

  /**
   * Se obtienen los mensajes de un chat
   * @param idA
   * @param idB
   */
  async getChat(idA: number, idB: number) {
    try {
      let query = `SELECT content, participantId, timestamp, 'text' AS 'type'
                    FROM ChatMessage JOIN Chat ON Chat.id=ChatMessage.idChat
                    WHERE (Chat.idA=${idA} OR Chat.idB=${idA}) AND (Chat.idA=${idB} OR Chat.idB=${idB})
                    ORDER BY timestamp ASC`;

      const result = await this.knex.raw(query);
      console.log('Se obtienen los mensajes del chat dado un id.');
      return result[0];
    } catch (error) {
      console.log('Error al obtener los mensajes del chat dado un id.');
    }
  }

  async getMyself(id: number) {
    //console.log('getChats(id) bbdd: ' + id);
    try {
      console.log('getMyself BBDD: ');
      let query = `SELECT id, username AS 'name', image AS 'profilePicture'
                    FROM User
                    WHERE id=${id}`;
      console.log(query);
      const result = await this.knex.raw(query);
      //console.log('Resultado de id: ' + result[0]);
      //console.log('Se obtiene myself');
      return result[0];
    } catch (error) {
      console.log('Error al obtener myself.');
    }
  }

  async getParticipant(id: number) {
    //let idParticipante = await this.getContrario(idChat, id);
    console.log('getParticipant BBDD');
    try {
      let query = `SELECT id, username AS 'name', image AS 'profilePicture'
                    FROM User
                    WHERE id=${id}`;
      console.log(query);
      const result = await this.knex.raw(query);
      //console.log('Resultado de id: ' + result[0]);
      //console.log('Se obtiene el participante');
      return result[0];
    } catch (error) {
      console.log('Error al obtener el participante');
    }
  }

  async getContrario(idChat: number, id: number) {
    //Obtenemos el código del participante del chat
    try {
      let query = `SELECT 
                      CASE 
                        WHEN Chat.idA=${id} THEN Chat.idB 
                          ELSE Chat.idA
                      END AS 'id'
                    FROM Chat
                    WHERE Chat.id=${idChat}`;
      const result = await this.knex.raw(query);
      //Se devuelve el id del otro participante
      //console.log('Se obtienen los participantes del chat dado un id.');
      return result[0].map(x => x.id);
    } catch (error) {
      console.log('Error al obtener los participantes del chat dado un id.');
    }
  }

  async createMessage(idA: number, idB: number, messageDto: MessageDto) {
    let idChat = await this.getIdChat(idA, idB);
    console.log('Voy a añadir el mensaje');
    try {
      let query = `INSERT INTO ChatMessage(idChat, content, timestamp, participantId) 
                    VALUES (${idChat}, '${messageDto.content}', '${messageDto.timestamp}', ${messageDto.participantId})`;
      await this.knex.raw(query);
      //Todo ha salido bien
      console.log('Se ha enviado el mensaje');
      return 0;
    } catch (error) {
      console.log('Se ha producido un error al intentar enviar el mensaje');
      return 1;
    }
  }

  async getIdChat(idA: number, idB: number) {
    //Obtenemos el código del participante del chat
    try {
      let query = `SELECT id FROM Chat WHERE (Chat.idA=${idA} OR Chat.idB=${idA}) AND (Chat.idA=${idB} OR Chat.idB=${idB})`;
      const result = await this.knex.raw(query);
      //Se devuelve el id del otro participante
      //console.log('Se obtienen los participantes del chat dado un id.');
      return result[0].map(x => x.id);
    } catch (error) {
      console.log('Error al obtener el id del chat.');
    }
  }

  async addNewMessage(chatDto: ChatDto) {
    /*
    //console.log('date: ' + chatDto.date);

    //Pasamos la fecha recibida a tipo String
    var fecha = chatDto.date.toLocaleString();
    console.log('fecha: ' + fecha);

    if (chatDto.idMGroupA == chatDto.idMGroupB) {
      console.log(
        'Selecciona la otra agrupación con la que quieres hacer el intercambio. No puedes realizar un intercambio contigo mismo',
      );
    }
    if (chatDto.neededMoney == 0) {
      console.log(
        'Como el dinero necesario es 0, es decir, no lo han modificado, lo cambio y lo pongo a null',
      );
      chatDto.neededMoney = null;
    }

    let query = `INSERT INTO Chat (idMGroupA, idMGroupB, date, place, description, repertoire, neededMoney, crowdfundingLink) 
    VALUES (${chatDto.idMGroupA}, ${chatDto.idMGroupB}, '${fecha}', '${chatDto.place}', '${chatDto.description}', '${chatDto.repertoire}', ${chatDto.neededMoney}, '${chatDto.crowdfundingLink}')`;

    try {
      await this.knex.raw(query);
      const emails = await this.getEmailsOfUsersSuscriptedToAgrupation(
        chatDto.idMGroupA,
        chatDto.idMGroupB,
      );

      const chatA = await this.chatDataBaseConnection.getChat(
        chatDto.idMGroupA,
      );
      const chatB = await this.chatDataBaseConnection.getChat(
        chatDto.idMGroupB,
      );

      return true;
    } catch (error) {
      return false;
    }
    */
  }
}
