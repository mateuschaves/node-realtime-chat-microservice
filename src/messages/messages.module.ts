import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [MessageService],
})
export class MessagesModule {}
