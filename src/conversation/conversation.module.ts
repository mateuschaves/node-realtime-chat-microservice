import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
