import { Repository, EntityRepository } from 'typeorm';
import User from './user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
