import { BaseEntity, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  text: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column()
  avatar: string;

  @Column()
  conversation: string;

  @Column()
  datetime: Date;
}
