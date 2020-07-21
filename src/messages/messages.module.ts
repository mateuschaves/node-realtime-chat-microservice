import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from 'src/conversation/conversation.service';
import { Conversation } from '../conversation/conversation.entity';
import { MessagesGateway } from './messages.gateway';
import { UserService } from './user.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, MessageRepository]),
    ConversationModule,
  ],
  providers: [
    MessageService,
    ConversationService,
    MessagesGateway,
    UserService,
    NotificationService,
  ],
})
export class MessagesModule {}