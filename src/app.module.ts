import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';

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
