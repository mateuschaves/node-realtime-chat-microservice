import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  conversation: number;

  @Column()
  datetime: Date;
}
