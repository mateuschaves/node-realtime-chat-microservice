import { Injectable, Inject } from '@nestjs/common';
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
        from.user_id,
        to.user_id,
      )) ||
      (await this.conversationService.checkConversationExists(
        to.user_id,
        from.user_id,
      ));

    if (conversation) {
      const message = new Message();

      message.text = text;
      message.image = image;
      message.user_id = from.user_id;
      message.image = image;
      message.avatar = from.avatar;
      message.datetime = new Date();
      message.name = from.name;
      message.conversation = conversation.id;

      await message.save();
    } else {
      const conversationCreated = await this.conversationService.createConversation(
        {
          personA: from.user_id,
          personB: to.user_id,
        },
      );

      const message = new Message();

      message.text = text;
      message.image = image;
      message.user_id = from.user_id;
      message.image = image;
      message.avatar = from.avatar;
      message.datetime = datetime;
      message.name = from.name;
      message.conversation = conversationCreated.id;
      await message.save();

      return message;
    }
  }
}
