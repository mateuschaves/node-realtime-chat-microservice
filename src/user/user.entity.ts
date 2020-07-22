import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  socket_id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @OneToMany(
    type => Message,
    message => message.conversation,
    { eager: true },
  )
  messages: Message[];
}
