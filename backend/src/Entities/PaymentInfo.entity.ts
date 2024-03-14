import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity.entity";

@Entity('paymentInfo')
export class PaymentInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => UserEntity, (user) => user.payments)
    // customer: UserEntity

    @Column()
    cardNumber: number

    @Column()
    cardHolder: String

    //address
    @Column()
    expiryDate: Date

    @Column()
    cvc : number

}