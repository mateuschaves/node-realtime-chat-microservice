import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';

import { typeOrmConfig } from './config/typeorm.config';
import { ImageModule } from './image/image.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConversationModule,
    MessagesModule,
    ImageModule,
    NotificationModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
