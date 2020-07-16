import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import User from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  removeUser(socket_id: string): void {
    return this.userRepository.removeUser(socket_id);
  }

  newUser(user: User): void {
    return this.userRepository.newUser(user);
  }
}
