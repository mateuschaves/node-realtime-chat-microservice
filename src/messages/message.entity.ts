import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Conversation } from 'src/conversation/conversation.entity';

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

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column({
    nullable: true,
  })
  avatar: string;

  @ManyToOne(
    type => Conversation,
    conversation => conversation.messages,
    { eager: false },
  )
  conversation: Conversation;

  @Column()
  datetime: Date;
}
