interface Person {
  socket_id?: string;
  user_id: number;
  name: string;
  avatar?: string;
}

export class CreateMessageDto {
  from: Person;
  to: Person;

  conversation?: number;
  text: string;
  datetime: Date;
  image?: string;
}
