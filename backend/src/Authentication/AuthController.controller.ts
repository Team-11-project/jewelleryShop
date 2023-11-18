import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './AuthService.service';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication Controller")
@Controller("auth")
export class AuthController{
    constructor(
        private authService: AuthService
    ){}

    @Post("createUser")
    async createUser(@Body() createUserDto: CreateUserDto): Promise<BaseResponse>{
        return this.authService.createUser(createUserDto);
    }
}