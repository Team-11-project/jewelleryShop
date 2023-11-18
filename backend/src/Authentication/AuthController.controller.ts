import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './AuthService.service';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/Dto/LoginUserDto.dto';

@ApiBearerAuth()
@ApiTags("Authentication Controller")
@Controller("auth")
export class AuthController{
    constructor(
        private authService: AuthService
    ){}

    @Post("createUser")
    async createUser(@Body() createUserDto: CreateUserDto): Promise<BaseResponse>{
        return await this.authService.createUser(createUserDto);
    }

    @Post("loginUser")
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<BaseResponse> {
        return await this.authService.loginUser(loginUserDto);
    }

    // @UseGuards(JwtGuard, RolesGuard)
    // @Roles(Role.ADMIN)
}