import { IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto{
    @IsString()
    @ApiProperty({example: 'JohnDoe@gmail.com', description: "user's valid email", required: true})
    email: string

    @IsString()
    @ApiProperty({example: '*****', description: "user's valid password", required: true})
    password: string

    @IsString()
    @ApiProperty({example: '*****', description: "user's valid password", required: true})
    employeeNumber: string
}