import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreatePaymentDto{
    @IsString()
    @ApiProperty({required: true})
    cardNumber: number

    @IsString()
    @ApiProperty({required: true})
    expiryDate: string

    @IsString()
    @ApiProperty({required: true})
    cvc: string

    @IsString()
    @ApiProperty({required: true})
    cardHolder: string

    @IsNumber()
    @ApiProperty({required: true})
    userId: number
}