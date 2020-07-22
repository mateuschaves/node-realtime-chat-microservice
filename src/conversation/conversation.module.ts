import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MessageService } from '../messages/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ConversationService, MessageService],
  exports: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
