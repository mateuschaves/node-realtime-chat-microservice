import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { Conversation } from './conversation/conversation.entity';
import { MessagesGateway } from './messages/messages.gateway';
import { Message } from './messages/message.entity';

import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConversationModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
