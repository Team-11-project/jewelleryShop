import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Role } from "./Role.enum";
import { CartEntity } from "./Cart.entity";
import { ReviewEntity } from './Review.entity';
import { FavoriteEntity } from "./Favorite.entity";
import { AddressEntity } from "./Address.entity";
import { PaymentInfoEntity } from "./PaymentInfo.entity";
import { OrderEntity } from "./Order.entity";
//import { NotificationEntity } from "./Notification.entity"; 

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column({ type: 'date' })
    createdAt: Date;
    
    @Column()
    isActive: boolean;

    @Column()
    role: Role;

    @Column()
    employeeNumber: number;

    @OneToOne(() => CartEntity)
    @JoinColumn({name: 'cartId'})
    cart: CartEntity;

    @OneToMany(() => ReviewEntity, review => review.user)
    reviews: ReviewEntity[];

    @OneToMany(() => FavoriteEntity, favorite => favorite.user)
    favoriteProducts: FavoriteEntity[];

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => PaymentInfoEntity)
    @JoinColumn()
    paymentInfo: PaymentInfoEntity;

    //@OneToMany(() => NotificationEntity, notification => notification.recipient)
    //notifications: NotificationEntity[];
    
}
