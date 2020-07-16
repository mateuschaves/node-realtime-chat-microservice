import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Conversation from './conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
})
export class ConversationModule {}
