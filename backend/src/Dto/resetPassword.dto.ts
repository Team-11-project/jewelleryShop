import { IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordDto{
    @IsString()
    @ApiProperty({example: '578673', description: "otp received in mail", required: true})
    otp: string

    @IsString()
    @ApiProperty({example: '***', description: "password1", required: true})
    password1: string

    @IsString()
    @ApiProperty({example: '***', description: "password2", required: true})
    password2: string

   
}