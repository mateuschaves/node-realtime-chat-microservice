import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { getManager } from 'typeorm';

@Injectable()
export class ConversationService {
  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation | null> {
    const { personA, personB } = createConversationDto;

    const conversation = new Conversation();
    conversation.personA = personA;
    conversation.personB = personB;

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

  async getConversations(user_id: number): Promise<Conversation> {
    try {
      return await getManager()
        .createQueryBuilder(Conversation, 'conversation')
        .where('conversation.personA = :id', { id: user_id })
        .orWhere('conversation.personB = :id', { id: user_id })
        .getOne();
    } catch (error) {
      throw new HttpException(
        'Erro ao listar conversas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
