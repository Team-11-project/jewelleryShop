import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class EditOrderDto{
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
}