import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './Order.entity';

@Entity()
export class ReturnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => OrderEntity, order => order.return)
  order: OrderEntity;

  @Column()
  totalPrice: number;

  @Column({ type: 'simple-array', nullable: true }) // Example for storing product IDs as an array
  returnedProductsIds: number[];

}


