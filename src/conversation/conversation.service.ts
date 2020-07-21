import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';

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
}
