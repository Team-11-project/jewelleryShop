import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { CategoryEntity } from "src/Entities/Category.entity"
import { Role } from "src/Entities/Role.enum"

export class CreateProductDto{
    @IsString()
    @ApiProperty({example: 'signature pear diamond ring', description: "name of product", required: true})
    name: string

    @IsString()
    @ApiProperty({example: 'pear', description: "words that can be used to describe the product", required: true})
    keywords: string

    @IsString()
    @ApiProperty({example: 'Gold', description: "material product is made out of", required: true})
    material: string

    @IsString()
    @ApiProperty({example: 'large diamond ring', description: "product description", required: true})
    detail: string

    @IsNumber()
    @ApiProperty({example: '10000', description: "product's price", required: true})
    price: number

    @IsNumber()
    @ApiProperty({example: '30', description: "product's stock level", required: true})
    stock: number

    @IsString()
    @ApiProperty({example: 'image url for now', description: "product image", required: true})
    image: string

    @IsNumber()
    @ApiProperty({example: '1', description: "product category id", required: true})
    category: number
}
