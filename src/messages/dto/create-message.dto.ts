import { Conversation } from 'src/conversation/conversation.entity';

interface Person {
  socket_id?: string;
  user_id: number;
  name: string;
  avatar?: string;
}

export class CreateMessageDto {
  from: Person;
  to: Person;

  conversation?: Conversation;
  text: string;
  datetime: Date;
  image?: string;
}
