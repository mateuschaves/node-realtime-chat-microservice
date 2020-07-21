import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger, Inject } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

import { MessageService } from './message.service';

import { UserService } from './user.service';

import User from './user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { NotificationService } from 'src/notification/notification.service';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');

  @Inject()
  private messageService: MessageService;
  @Inject()
  private userService: UserService;
  @Inject()
  private notificationService: NotificationService;

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): Promise<void> {
    try {
      const body: CreateMessageDto = JSON.parse(data);
      const { from, to, text, datetime, image } = body;
      this.messageService.createMessage({
        datetime,
        from,
        text,
        to,
        image,
      });

      const socketIdToSendMessage = this.userService.getUser(to.user_id)
        ?.socket_id;
      this.server.to(socketIdToSendMessage).emit('messageSent', body);
      await this.notificationService.sendNotification({
        content: text,
        title: from.name,
        group: from.user_id,
        player_id: '8fc80ab5-130d-4ffa-965d-b64eac1024c2',
        avatar: from.avatar,
      });
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
