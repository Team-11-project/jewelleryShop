import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entities/UserEntity.entity";
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Entities/Role.enum';

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async hashPassword (password: string): Promise<string>{
        const saltRounds = 12
       return await bcrypt.hash(password, saltRounds);
    }

    async createUser(createUserDto: CreateUserDto): Promise<BaseResponse>{
        try {
            const date = new Date();
            let user = new UserEntity()
            user.firstName = createUserDto.firstName
            user.lastName = createUserDto.lastName
            user.email = createUserDto.email
            user.isActive = false
            user.role = createUserDto.role
            user.createdAt = date

            const checkUser = await this.userRepository.findOne({
                where: {
                    email: createUserDto.email
                }
            })

            if(checkUser){
                console.log(checkUser)
                return{
                    status: 400,
                    message: "User already exists, please log in or change password",
                }
            }

            if (user.role == Role.ADMIN){
                let num = Math.floor(Math.random() * 90000) + 10000;
                user.employeeNumber = num
            }
            else{
                user.employeeNumber = 0
            }

            if (createUserDto.password1 === createUserDto.password2){
                const encryptedPass = await this.hashPassword(createUserDto.password1)
                user.password = encryptedPass
            }
            else{
                return {
                    status: 400,
                    message: "Passwords do not match",
                }
            }
            
             const newUser = await this.userRepository.save(user);

             if (newUser){
                return{
                    status: 200,
                    message: "new user created",
                    response: newUser,
                }
             }  
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error
            }
            
        }
    }
}