import { User } from '../../user/user.entity';
export class CreateConversationDto {
  personA: User;

  personB: User;
}
