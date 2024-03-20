import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './UserEntity.entity';

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: ['system', 'userAction', 'other'],
    default: 'system'
  })
  type: string;

  @Column({
    type: 'enum',
    enum: ['read', 'unread'],
    default: 'unread'
  })
  status: string;

  //@ManyToOne(() => UserEntity, user => user.notifications)
  //recipient: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
