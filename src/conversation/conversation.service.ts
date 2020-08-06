import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { getManager } from 'typeorm';
import { Message } from '../messages/message.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ConversationService {
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

      const conversationsFormated = await Promise.all(
        conversations.map(async conversation => ({
          id: conversation.id,
          name: (
            await User.findOne({
              where: {
                id:
                  user_id === conversation.personA
                    ? conversation.personB
                    : conversation.personA,
              },
            })
          )?.name,
          user_id:
            user_id === conversation.personA
              ? conversation.personB
              : conversation.personA,
          avatar: (
            await User.findOne({
              where: {
                id:
                  user_id === conversation.personA
                    ? conversation.personB
                    : conversation.personA,
              },
            })
          )?.avatar,
          lastMessage: (
            await Message.find({
              where: { conversationId: conversation.id },
            })
          ).slice(-1)[0],
        })),
      );
      return conversationsFormated.sort(
        (conversation: any, nextConversation: any) =>
          new Date(nextConversation.lastMessage.datetime).getTime() -
          new Date(conversation.lastMessage.datetime).getTime(),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao listar conversas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
