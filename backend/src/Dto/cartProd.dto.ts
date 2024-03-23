import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCartProdDto{
    @IsNumber()
    @ApiProperty({required: true})
    productId: number

    @IsNumber()
    @ApiProperty({required: true})
    qty: string
}