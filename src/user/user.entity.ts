import { Entity, Column, BaseEntity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  socket_id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({ nullable: true })
  player_id: string;

  @OneToMany(
    type => Message,
    message => message.conversation,
    { eager: true },
  )
  messages: Message[];
}
