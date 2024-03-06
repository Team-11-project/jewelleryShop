import { Controller, Get, Param, UseGuards, HttpStatus, HttpException, NotFoundException } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiParam, ApiResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard'; 
import { OrderService } from './../Services/OrderService.service'; 
import { OrderEntity } from 'src/entities/Order.entity';
import { OrderStatus } from "src/entities/OrderStatus.enum";

@ApiBearerAuth()
@ApiTags("Orders Controller")
@Controller("orders")
export class OrdersController {
    constructor(private orderService: OrderService) {}

    @ApiResponse({status: 200,description: 'OK',type: OrderEntity,isArray: true,})
      @ApiNotFoundResponse({description: 'No orders found for the specified customer',})
      @UseGuards(JwtGuard, RolesGuard)
      @ApiParam({ name: 'customerId', type: 'number' })
      @Get("get-orders-by-customer/:customerId")
      async getOrdersByCustomer(@Param("customerId") customerId: number): Promise<OrderEntity[]> {
        try {
          const orders = await this.orderService.getOrdersByCustomer(customerId);
          return orders;
        } catch (error) {
          if (error instanceof NotFoundException) {
            // Throw a more specific exception for Swagger documentation
            throw new NotFoundException('No orders found for the specified customer');
          }
          throw error;
        }
      }
      
    @ApiNotFoundResponse({description: 'Order not found',})
    @UseGuards(JwtGuard, RolesGuard)
    @ApiParam({ name: 'orderId', type: 'number' })
    @Get(":orderId")
    async getOrderById(@Param("orderId") orderId: number): Promise<OrderEntity> {
        try {
            const order = await this.orderService.getOrderById(orderId);
            return order;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        message: `Order with ID ${orderId} not found`,
                        error: 'Not Found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            }
            throw error;
        }
    }
    
  @ApiNotFoundResponse({description: 'No orders found with the specified status',})
  @UseGuards(JwtGuard, RolesGuard)
  @ApiParam({ name: 'status', type: 'string', enum: OrderStatus }) // Assuming OrderStatus is an enum
  @Get("by-status/:status")
  async getOrdersByStatus(@Param("status") status: OrderStatus): Promise<OrderEntity[]> {
      try {
          const orders = await this.orderService.getOrdersByStatus(status);
          return orders;
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw new HttpException(
                  {
                      statusCode: HttpStatus.NOT_FOUND,
                      message: `No orders found with status: ${status}`,
                      error: 'Not Found',
                  },
                  HttpStatus.NOT_FOUND,
              );
          }
          throw error;
      }
  }
    }
