import { IsBoolean, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class EditUserDto{
    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    firstName: string

    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    lastName: string

    @IsString()
    @ApiProperty({example: 'JohnDoe@gmail.com', description: "user's valid email", required: true})
    email: string
}