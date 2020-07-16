import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Conversation {
  @ObjectIdColumn()
  _id: string;

  @Column()
  service_provider_id: string;

  @Column()
  customer_id: string;
}
