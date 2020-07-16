import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async createMessage(createMessageDto: CreateMessageDto): Promise<void> {
    const {
      avatar,
      datetime,
      name,
      user_id,
      text,
      image = undefined,
    } = createMessageDto;

    const message = new Message();

    message.text = text;
    message.image = image;
    message.user_id = user_id;
    message.image = image;
    message.avatar = avatar;
    message.datetime = datetime;
    message.name = name;

    message.save();
  }
}
