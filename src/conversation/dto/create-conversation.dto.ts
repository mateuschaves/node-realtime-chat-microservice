import { IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  personA: number;

  @IsString()
  personB: number;
}
