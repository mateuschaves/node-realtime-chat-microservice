import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}
  @Get('/user/:id')
  getConversations(@Param('id', ParseIntPipe) user_id: number) {
    return this.conversationService.getConversations(user_id);
  }
}
