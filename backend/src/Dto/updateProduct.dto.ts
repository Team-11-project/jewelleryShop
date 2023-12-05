import { IsString, IsNumber, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'signature pear diamond ring', description: "name of product" })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'pear', description: "words that can be used to describe the product" })
    keywords?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Gold', description: "material product is made out of" })
    material?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'large diamond ring', description: "product description" })
    detail?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 10000, description: "product's price" })
    price?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 10, description: "product's stock level" })
    stock?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'image url for now', description: "product image" })
    image?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1, description: "product category id" })
    category?: number;
}