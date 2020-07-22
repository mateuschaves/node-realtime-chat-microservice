import { User } from '../../user/user.entity';
export class CreateConversationDto {
  personA: User;
  personBName: string;
  personAName: string;
  personB: User;
}
