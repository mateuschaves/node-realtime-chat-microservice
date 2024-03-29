import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

import { ConversationService } from '../conversation/conversation.service';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  @Inject()
  private conversationService: ConversationService;

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const { from, to, datetime, image, text } = createMessageDto;

    const conversation =
      (await this.conversationService.checkConversationExists(
        from.id,
        to.id,
      )) ||
      (await this.conversationService.checkConversationExists(to.id, from.id));

    if (conversation) {
      const message = new Message();

      message.text = text;
      message.image = image;
      message.user = from;
      message.image = image;
      message.datetime = new Date();
      message.conversation = conversation;

      await message.save();
    } else {
      const conversationCreated = await this.conversationService.createConversation(
        {
          personA: from,
          personAName: from.name,
          personBName: to.name,
          personB: to,
        },
      );

      const message = new Message();

      message.text = text;
      message.image = image;
      message.user = from;
      message.image = image;
      message.datetime = datetime;
      message.conversation = conversationCreated;
      await message.save();

      return message;
    }
  }

  async getMessagesFromConversations(
    conversation_id: number,
    page: number = null,
  ): Promise<Message[] | { page: number; limit: number; messages: Message[] }> {
    try {
      page = Number(page);
      if (page) {
        const messages = await Message.find({
          where: {
            conversationId: conversation_id,
          },
          relations: ['user'],
          take: 15,
          skip: (page - 1) * 15,
          order: {
            datetime: 'DESC',
          },
        });

        messages.forEach(message => {
          delete message.user.messages;
        });
        return { page, limit: 15, messages };
      } else {
        const messages = await Message.find({
          where: {
            conversationId: conversation_id,
          },
          relations: ['user'],
        });

        messages.forEach(message => {
          delete message.user.messages;
        });
        return messages;
      }
    } catch (error) {
      throw new HttpException(
        'Erro ao listar mensagens',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMessagesWithoutConversation(
    personAID: number,
    personBID: number,
    page: number = null,
  ): Promise<Message[] | { page: number; messages: Message[] }> {
    const conversation =
      (await this.conversationService.checkConversationExists(
        personAID,
        personBID,
      )) ||
      (await this.conversationService.checkConversationExists(
        personBID,
        personAID,
      ));
    if (conversation)
      return this.getMessagesFromConversations(conversation.id, page);
    else return [];
  }
}
