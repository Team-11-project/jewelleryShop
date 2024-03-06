import { Injectable, NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./../entities/Order.entity";
import { OrderStatus } from "./../entities/OrderStatus.enum";

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    async getOrdersByCustomer(customerId: number): Promise<OrderEntity[]> {
        try {
            const orders = await this.orderRepository.find({
                where: {
                    cart: {
                        user: { userId: customerId },
                    },
                },
                relations: ['cart', 'cart.user'],

            });

            if (!orders || orders.length === 0) {
                throw new NotFoundException("No orders found for the specified customer");
            }

            return orders;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Failed to retrieve orders");
        }
    }

    async getOrderById(orderId: number): Promise<OrderEntity> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: orderId },
                relations: ['cart', 'cart.user'],
            });

            if (!order) {
                throw new NotFoundException(`Order with ID ${orderId} not found`);
            }

            return order;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Failed to retrieve order");
        }
    }

    async getOrdersByStatus(status: OrderStatus): Promise<OrderEntity[]> {
        try {
            const orders = await this.orderRepository.find({
                where: {
                    status: status,
                },
                relations: ['cart', 'cart.user'],
            });

            if (!orders || orders.length === 0) {
                throw new NotFoundException(`No orders found with status: ${status}`);
            }

            return orders;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException("Failed to retrieve orders");
        }
    }

}

