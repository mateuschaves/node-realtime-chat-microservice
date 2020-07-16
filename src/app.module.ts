import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import Conversation from './conversation/conversation.entity';
import { MessagesGateway } from './messages/messages.gateway';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://messenger_database/node-realtime-chat-microservice',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Conversation, Message],
    }),
    ConversationModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
