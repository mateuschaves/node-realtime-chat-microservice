import { Controller, Param, ParseIntPipe, Get } from '@nestjs/common';

import { MessageService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Get('/conversation/:id')
  getMessages(@Param('id', ParseIntPipe) conversation_id: number) {
    return this.messageService.getMessagesFromConversations(conversation_id);
  }
}
