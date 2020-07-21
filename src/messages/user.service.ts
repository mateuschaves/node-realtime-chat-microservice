import { Injectable, Logger } from '@nestjs/common';
import User from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private logger: Logger = new Logger('MessageGateway');

  newUser(user: User): void {
    const { socket_id } = user;
    const userFound = this.users.find(user => user.socket_id === socket_id);
    !userFound && this.users.push(user);
    this.logger.debug(this.users);
  }

  removeUser(socket_id: string): void {
    this.users = this.users.filter(user => user.socket_id !== socket_id);
    this.logger.debug(this.users);
  }
}
