import { Controller, Param, ParseIntPipe, Get, Query } from '@nestjs/common';

import { MessageService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Get('/conversation/:id')
  getMessages(
    @Param('id', ParseIntPipe) conversation_id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.messageService.getMessagesFromConversations(
      conversation_id,
      page,
      limit,
    );
  }

  @Get('/personA/:personAID/personB/:personBID')
  getMessagesWithoutConversation(
    @Param('personAID', ParseIntPipe) personAID: number,
    @Param('personBID', ParseIntPipe) personBID: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.messageService.getMessagesWithoutConversation(
      personAID,
      personBID,
      page,
      limit,
    );
  }
}
