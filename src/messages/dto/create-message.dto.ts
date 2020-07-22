import { Conversation } from 'src/conversation/conversation.entity';
import { User } from '../../user/user.entity';

export class CreateMessageDto {
  from: User;
  to: User;

  conversation?: Conversation;
  text: string;
  datetime: Date;
  image?: string;
}
