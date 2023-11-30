
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsedResetToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resetToken: string;

    @Column()
    createdAt: Date;
}
