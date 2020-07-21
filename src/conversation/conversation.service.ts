import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation | null> {
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    await this.conversationRepository.save(conversation);
    return conversation;
  }

  async checkConversationExists(
    personA: number,
    personB: number,
  ): Promise<Conversation | null> {
    console.log(this.conversationRepository);
    const found = await this.conversationRepository.findOne({
      where: {
        personA,
        personB,
      },
    });
    if (found) return found;
    else return null;
  }
}
