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

import { UserService } from '../user/user.service';

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
  private notificationService: NotificationService;
  @Inject()
  private userService: UserService;

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): Promise<void> {
    try {
      const body: CreateMessageDto = JSON.parse(JSON.stringify(data));
      this.logger.debug(body);
      const { from, to, text, datetime = new Date(), image } = body;

      const senderUser = await this.userService.getUser(from.id);
      const recipientUser = await this.userService.getUser(to.id);

      this.logger.debug(senderUser);
      this.logger.debug(recipientUser);

      if (senderUser && recipientUser) {
        this.logger.log('creating message');
        this.messageService.createMessage({
          datetime,
          from: senderUser,
          text,
          to: recipientUser,
          image,
        });

        this.server.to(recipientUser.socket_id).emit('messageSent', body);
        await this.notificationService.sendNotification({
          content: text,
          title: senderUser.name,
          group: senderUser.id,
          player_id: recipientUser.player_id,
          avatar: senderUser.avatar,
        });
      }
    } catch (error) {
      this.logger.error(error);
      this.server.emit('messageNotSent', error.toString());
    }
  }

  @SubscribeMessage('subscribeOnChat')
  async handleSubscriber(
    client: Socket,
    payload: { id: number; name: string; avatar: string; player_id: string },
  ): Promise<void> {
    this.logger.debug(payload);
    const { id, name, avatar, player_id } = JSON.parse(JSON.stringify(payload));
    await this.userService.createUser({
      name,
      user_id: id,
      socket_id: client.id,
      avatar,
      player_id,
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
