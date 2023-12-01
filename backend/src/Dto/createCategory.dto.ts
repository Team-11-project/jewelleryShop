import { IsBoolean, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/Entities/Role.enum"

export class CreateCategoryDto{
    @IsString()
    @ApiProperty({example: 'Rings', description: "product category name", required: true})
    categoryName: string

    @IsString()
    @ApiProperty({example: 'Rings', description: "product category description", required: true})
    description: string
}