import { IsBoolean, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/Entities/Role.enum"

export class CreateUserDto{
    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    firstName: string

    @IsString()
    @ApiProperty({example: 'John Doe', description: "user's full name", required: true})
    lastName: string

    @IsString()
    @ApiProperty({example: 'JohnDoe@gmail.com', description: "user's valid email", required: true})
    email: string

    @IsString()
    @ApiProperty({example: '*******', description: "user's valid password", required: true})
    password1: string

    @IsString()
    @ApiProperty({example: '*******', description: "same as password1", required: true})
    password2: string

    @ApiProperty({example: 'user', description: "user role either user or admin", required: true})
    role: Role

}