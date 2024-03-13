import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    productId: number; 

    @Column({ default: false })
    isWebsiteReview: boolean; // Indicates whether the review is for the entire website

}
