import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from 'src/conversation/conversation.service';
import { Conversation } from '../conversation/conversation.entity';
import { MessagesGateway } from './messages.gateway';
import { UserService } from '../user/user.service';
import { NotificationService } from 'src/notification/notification.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), ConversationModule],
  providers: [
    MessageService,
    ConversationService,
    MessagesGateway,
    UserService,
    NotificationService,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
