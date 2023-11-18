import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService.service';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/Dto/LoginUserDto.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/Entities/Role.enum';

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

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getUserByUserId")
    async getUserByUserId(@Param("userId") userId: number): Promise<BaseResponse> {
        return await this.authService.getUserByUserId(userId);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getUserByRole")
    async getUserByRole(@Param("role") role: Role): Promise<BaseResponse> {
        return await this.authService.getUserByRole(role);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getAllUsers")
    async getAllUsers():Promise<BaseResponse>{
        return await this.authService.getAllUsers();
    }
}