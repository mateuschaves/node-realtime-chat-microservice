import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from 'src/conversation/conversation.service';
import { Conversation } from '../conversation/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, MessageRepository]),
    ConversationModule,
  ],
  providers: [MessageService, ConversationService],
})
export class MessagesModule {}
