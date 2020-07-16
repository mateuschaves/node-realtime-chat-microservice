import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Conversation {
  @ObjectIdColumn()
  _id: string;

  @Column()
  firstPerson: string;

  @Column()
  secondPerson: string;
}
