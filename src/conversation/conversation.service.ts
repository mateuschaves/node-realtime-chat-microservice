import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { getManager } from 'typeorm';
import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.entity';

@Injectable()
export class ConversationService {
  private messageService: MessageService;

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation | null> {
    const {
      personA,
      personB,
      personAName,
      personBName,
    } = createConversationDto;

    const conversation = new Conversation();
    conversation.personA = personA.id;
    conversation.personB = personB.id;
    conversation.personAName = personAName;
    conversation.personBName = personBName;

    await conversation.save();
    return conversation;
  }

  async checkConversationExists(
    personA: number,
    personB: number,
  ): Promise<Conversation | null> {
    const found = await Conversation.findOne({
      where: {
        personA,
        personB,
      },
    });
    if (found) return found;
    else return null;
  }

  async getConversations(user_id: number): Promise<any[]> {
    try {
      const conversations = await getManager()
        .createQueryBuilder(Conversation, 'conversation')
        .where('conversation.personA = :id', { id: user_id })
        .orWhere('conversation.personB = :id', { id: user_id })
        .getMany();

      return await Promise.all(
        conversations.map(async conversation => ({
          ...conversation,
          lastMessage: (
            await Message.find({
              where: { conversationId: conversation.id },
            })
          ).slice(-1)[0],
        })),
      );
    } catch (error) {
      throw new HttpException(
        'Erro ao listar conversas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
