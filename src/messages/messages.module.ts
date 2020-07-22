import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from '../conversation/conversation.entity';
import { MessagesGateway } from './messages.gateway';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [
    MessageService,
    ConversationService,
    MessagesGateway,
    UserService,
    NotificationService,
  ],
  controllers: [MessagesController],
  exports: [MessageService],
})
export class MessagesModule {}
