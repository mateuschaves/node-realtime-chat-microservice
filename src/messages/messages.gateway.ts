import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';

import { UserService } from './user.service';
import { UserRepository } from './users.repository';

import User from './user.entity';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  private messageService = new MessageService(new MessageRepository());
  private userService = new UserService(new UserRepository());

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: string): void {
    try {
      const { from, to, text, datetime, image } = JSON.parse(payload);

      this.messageService.createMessage({
        datetime,
        from,
        text,
        to,
      });
      this.server.to(to).emit('messageSent', payload);
    } catch (error) {
      this.server.emit('messageNotSent', error.toString());
    }
  }

  @SubscribeMessage('subscribeOnChat')
  handleSubscriber(client: Socket, payload: string): void {
    const { id } = JSON.parse(payload);
    const user: User = {
      socket_id: client.id,
      id,
    };
    this.userService.newUser(user);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.userService.removeUser(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
