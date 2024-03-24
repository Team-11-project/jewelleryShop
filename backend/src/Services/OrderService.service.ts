import { Injectable, NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./../Entities/Order.entity";
import { OrderStatus } from "./../Entities/OrderStatus.enum";
import { ReturnEntity } from "src/Entities/Return.entity";
import { CreateReturnDto } from "src/Dto/createReturnDto.dto";
import { MailService } from "src/Mail/MailService.service";
import { BaseResponse } from "src/Responses/BaseResponse";

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(ReturnEntity)
        private readonly returnRepository: Repository<ReturnEntity>,
        private readonly mailService: MailService,
    ) {}

    async getOrdersByCustomer(customerId: number): Promise<BaseResponse> {
        try {
            const orders = await this.orderRepository.find({
                where: {
                        user: { userId: customerId },
                },
                relations: ['cartProducts', 'user', 'cartProducts.product'],

            });

            if (!orders || orders.length === 0) {
                return{
                    status: 204,
                    message:"No orders found for the specified customer"
                }
                // throw new NotFoundException("No orders found for the specified customer");
            }

            return{
                status: 200,
                message:"orders Found",
                response: orders
            }
        } catch (error) {
            console.error(error);
            // throw new InternalServerErrorException("Failed to retrieve orders");
        }
    }

    async getOrderById(orderId: number): Promise<OrderEntity> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: orderId },
                relations: ['cartProducts', 'user', 'cartProducts.product'],
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
                relations: ['cartProducts', 'cartProducts.product'],
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

    async createReturn(orderId: number, createReturnDto: CreateReturnDto): Promise<BaseResponse> {
        try {
            const order = await this.orderRepository.findOne({where:{id: orderId},});
            if (!order) {
                return {
                    status: 404,
                    message: "order not found"
                }
            }

            const newReturn = new ReturnEntity();
            newReturn.order = order;
            newReturn.dateCreated = new Date();
            newReturn.status = "pending";
            newReturn.returnedProductsIds = createReturnDto.returnedProducts;
            newReturn.totalPrice = createReturnDto.totalPrice;
            await this.returnRepository.save(newReturn);
            return {
                status: 200,
                message: "return created",
                response: newReturn
            }
        } catch (error) {
            console.error(error);
        }
    }

    async updateReturnStatus(returnId: number, newStatus: string): Promise<ReturnEntity> {
        const returnEntity = await this.returnRepository.findOne({where:{id: returnId},});
        if (!returnEntity) {
            throw new NotFoundException(`Return with ID ${returnId} not found`);
        }

        
        returnEntity.status = newStatus;
        return await this.returnRepository.save(returnEntity);
    }

}

