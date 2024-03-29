import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { Controller, Post, Get, Body, Param, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './AuthService.service';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/Dto/LoginUserDto.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/Entities/Role.enum';
import { ResetPasswordDto } from 'src/Dto/resetPassword.dto';
import { EditOrderDto } from 'src/Dto/editOrderDto.dto';
import { EditUserDto } from 'src/Dto/EditUserDto.dto';
// import * as nodemailer from 'nodemailer';


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
    @Get("getUserByUserId/:userId")
    async getUserByUserId(@Param("userId") userId: number): Promise<BaseResponse> {
      
        return await this.authService.getUserByUserId(userId);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getUserByRole/:role")
    async getUserByRole(@Param("role") role: Role): Promise<BaseResponse> {
        return await this.authService.getUserByRole(role);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get("getAllUsers")
    async getAllUsers():Promise<BaseResponse>{
        return await this.authService.getAllUsers();
    }

    @Get("sendResetCode/:email")
    async sendResetCode(@Param("email") email: string): Promise<BaseResponse> {
        return await this.authService.sendResetcode(email);
    }

    @Post("resetPassword/:userId")
    async resetPassword(@Param("userId") userId: number, @Body() resetPasswordDto: ResetPasswordDto): Promise<BaseResponse> {
        return await this.authService.resetPassword(userId, resetPasswordDto);
    }

    @Put("updateUser/:userId")
    async editUser(@Param("userId") userId:number, @Body() editUserDto:EditUserDto): Promise<BaseResponse>{
        return await this.authService.editUser(userId, editUserDto);
    }
    
}