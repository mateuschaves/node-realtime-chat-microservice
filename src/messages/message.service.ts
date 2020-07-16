import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<void> {
    return this.messageRepository.createMessage(createMessageDto);
  }
}
