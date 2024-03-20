import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressType } from "./AddressType.enum";
import { UserEntity } from "./UserEntity.entity";

@Entity('address')
export class AddressEntity {
    @PrimaryGeneratedColumn()
    addressId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({name: 'addressId'})
    user: UserEntity;

    //city
    @Column()
    city: String

    //town
    @Column()
    town: String

    //address
    @Column()
    address: String

    @Column()
    postcode : String

    @Column()
    country: String

    //one customer to many addresses
}