import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personA: number;

  @Column({ nullable: true })
  personAName: string;

  @Column({ nullable: true })
  personBName: string;

  @Column()
  personB: number;

  @OneToMany(
    type => Message,
    message => message.conversation,
    { eager: true },
  )
  messages: Message[];
}
