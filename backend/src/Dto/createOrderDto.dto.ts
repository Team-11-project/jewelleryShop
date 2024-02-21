import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/Entities/Role.enum"

export class CreateOrderDto{
    @IsNumber()
    @ApiProperty({example: '1', description: "user id", required: true})
    userId: number;

    @IsNumber()
    @ApiProperty({example: '1', description: "cart id", required: true})
    cartId: number;

    @IsString()
    @ApiProperty({example: '304030202929', description: "payment card number", required: true})
    paymentDetail: String

    @IsString()
    @ApiProperty({example: 'address', description: "shipping address", required: true})
    shippingAddress: String

    @IsString()
    @ApiProperty({example: 'address', description: "billing address", required: true})
    billingAddress: String


}