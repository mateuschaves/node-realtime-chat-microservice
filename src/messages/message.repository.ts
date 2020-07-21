import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const { text, from, datetime, image, conversation } = createMessageDto;

    const message = new Message();

    message.text = text;
    message.image = image;
    message.user_id = from.user_id;
    message.image = image;
    message.avatar = from.avatar;
    message.datetime = datetime;
    message.name = from.name;
    message.conversation = conversation;

    await message.save();

    return message;
  }
}
