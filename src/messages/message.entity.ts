import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Conversation } from 'src/conversation/conversation.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne(
    type => Conversation,
    conversation => conversation.messages,
    { eager: false },
  )
  conversation: Conversation;

  @ManyToOne(
    type => User,
    user => user.messages,
    { eager: false },
  )
  user: User;

  @Column()
  conversationId: number;

  @Column()
  userId: number;

  @Column()
  datetime: Date;
}
