import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/Entities/Role.enum"
import { CreateAddressDto } from "./createAddressDto.dto";
import { CreatePaymentDto } from "./createPaymentInfo.dto";

export class CreateOrderDto{
    @IsNumber()
    @ApiProperty({example: '1', description: "user id", required: true})
    userId: number;

    // @IsNumber()
    // @ApiProperty({example: '1', description: "cart id", required: true})
    // cartId: number;

    @IsString()
    @ApiProperty({required: true})
    city: string

    @IsString()
    @ApiProperty({required: true})
    address: string

    @IsString()
    @ApiProperty({required: true})
    postcode: string

    @IsString()
    @ApiProperty({required: true})
    country: string

    @IsString()
    @ApiProperty({required: true})
    cardNumber: String

    @IsString()
    @ApiProperty({required: true})
    expiryDate: Date

    @IsString()
    @ApiProperty({required: true})
    cvc: String

    @IsString()
    @ApiProperty({required: true})
    cardHolder: string

   
    @ApiProperty({required: true})
    totalPrice: number


    // @IsNumber()
    // @ApiProperty({example: '304030202929', description: "payment card number", required: true})
    // paymentDetail: number

    // @IsString()
    // @ApiProperty({example: 'address', description: "shipping address", required: true})
    // shippingAddress: CreateAddressDto

    // @IsString()
    // @ApiProperty({example: 'address', description: "billing address", required: true})
    // billingAddress: CreateAddressDto


}