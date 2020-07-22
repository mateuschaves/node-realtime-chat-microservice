import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, avatar, socket_id, user_id, player_id } = createUserDto;

      const userAlreadyExist = await this.getUser(user_id);

      if (userAlreadyExist) {
        userAlreadyExist.socket_id = socket_id;
        userAlreadyExist.avatar = avatar;
        userAlreadyExist.name = name;
        userAlreadyExist.player_id = player_id;
        await userAlreadyExist.save();

        return userAlreadyExist;
      }

      const user = new User();

      user.avatar = avatar;
      user.id = user_id;
      user.socket_id = socket_id;
      user.name = name;
      user.player_id = player_id;

      await user.save();

      return user;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      return await User.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
