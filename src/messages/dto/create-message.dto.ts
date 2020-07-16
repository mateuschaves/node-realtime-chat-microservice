import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsDate()
  datetime: Date;

  @IsString()
  name: string;

  @IsNumber()
  user_id: number;

  @IsString()
  avatar: string;

  @IsString()
  to: string;

  @IsString()
  image?: string;
}
