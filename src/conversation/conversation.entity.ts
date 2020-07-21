import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity()
export class Conversation extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  personA: number;

  @Column()
  personB: number;
}
