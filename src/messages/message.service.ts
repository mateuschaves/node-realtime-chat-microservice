import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

import { ConversationService } from '../conversation/conversation.service';
import { Message } from './message.entity';
import { Conversation } from 'src/conversation/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  private conversationRepository: Repository<Conversation>;

  private conversationService: ConversationService = new ConversationService(
    this.conversationRepository,
  );

  constructor(
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const { from, to, datetime, image } = createMessageDto;

    console.log(this.conversationRepository);
    const message = new Message();

    const conversation =
      this.conversationService.checkConversationExists(
        from.user_id,
        to.user_id,
      ) ||
      this.conversationService.checkConversationExists(
        to.user_id,
        from.user_id,
      );

    if (
      this.conversationService.checkConversationExists(
        from.user_id,
        to.user_id,
      ) ||
      this.conversationService.checkConversationExists(to.user_id, from.user_id)
    ) {
      return await this.messageRepository.createMessage({
        ...createMessageDto,
        conversation: (await conversation)._id,
      });
    } else {
      const conversationCreated = await this.conversationService.createConversation(
        {
          personA: from.user_id,
          personB: to.user_id,
        },
      );

      return await this.messageRepository.createMessage({
        ...createMessageDto,
        conversation: conversationCreated._id,
      });
    }
  }
}
