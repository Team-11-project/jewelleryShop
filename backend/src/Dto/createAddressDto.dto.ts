import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAddressDto{
    @IsNumber()
    @ApiProperty({required: true})
    userId: number

    @IsString()
    @ApiProperty({required: true})
    city: string

    @IsString()
    @ApiProperty({required: true})
    town: string

    @IsString()
    @ApiProperty({required: true})
    address: string

    @IsString()
    @ApiProperty({required: true})
    postcode: string

    @IsString()
    @ApiProperty({required: true})
    country: string

    // @IsString()
    // @ApiProperty({example:"billing or shipping", required: true})
    // addressType: string
}