import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './../Dto/CreateUserDto.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entities/UserEntity.entity";
import { ProductEntity } from "src/Entities/Product.entity";
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from 'src/Entities/Role.enum';
import { LoginUserDto } from 'src/Dto/LoginUserDto.dto';
import { JwtService } from '@nestjs/jwt';
// import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private jwtService: JwtService,
    ){}

    async hashPassword (password: string): Promise<string>{
        const saltRounds = 12
       return await bcrypt.hash(password, saltRounds);
    }

    // async generateVerificationCode(): Promise<string>{
    //     const characters = '0123456789';
    //     let verificationCode = '';
    //     for (let i = 0; i < 6; i++) {
    //         const randomIndex = Math.floor(Math.random() * characters.length);
    //         verificationCode += characters[randomIndex];
    //       }
        
    //       return verificationCode;
    // }

    // //async sendVerificationEmail(email: string): Promise<void> {
    //     const transporter = nodemailer.createTransport({
    //       service: 'gmail',
    //       auth: {
    //         user: 'regalia912@gmail.com',
    //         pass: 'Regal912lia' 
    //       }
    //     });

    //     const vCode = this.generateVerificationCode();
        
    //     const mailOptions = {
    //       from: 'regalia912@gmail.com',
    //       to: email,
    //       subject: 'Verification Code',
    //       text: `Your verification code is: $vcode`
    //     };
      
    //     await transporter.sendMail(mailOptions);
      
    //     console.log('Verification email sent successfully.');
    // }

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
            //  this.sendVerificationEmail(user.email);

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

    async validateUserPassword(password: string, user: UserEntity): Promise<any>{
        if (user){
        return await bcrypt.compare(password, user.password)
    }
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<any>{
        try {
            const {email, password, employeeNumber} = loginUserDto

            const findUser = await this.userRepository.findOne({
                where: {
                    email: email
                }})


                if(findUser){
                    //finds user
                    const validate = await this.validateUserPassword(password, findUser)
                    if(validate == true){
                        const user = {
                            id: findUser.userId,
                            firstName: findUser.firstName,
                            lastName: findUser.lastName,
                            email: findUser.email,
                            role: findUser.role,
                            employeeNumber: findUser.employeeNumber,
                            isActive: findUser.isActive,
                            createdAt: findUser.createdAt,
                        }
                        const token = await this.jwtService.signAsync({user})
                        return {
                            token: token
                        }
                        
                    }
                    else{
                        return {
                            status: 400,
                            message: "password is incorrect"
                     }
                    }
                }
                return {
                    status: 400,
                    message: "email or employee number is incorrect"
             }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
            
        }
    }

    async getUserByUserId(id: number): Promise<BaseResponse>{
        try {
            console.log(id)

            const user = await this.userRepository.findOne({
                where:{
                    userId: id
                }
            })
            console.log(user)

            if(!user){
                return{
                    status: 400,
                    message: "user not found"
                }
            }

            return{
                status: 200,
                message: "User found",
                response: user
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
        }
        
    }

    async getUserByRole(role: Role): Promise<BaseResponse>{
        try {

            const user = await this.userRepository.find({
                where:{
                    role: role
                }
            })

            if(!user){
                return{
                    status: 400,
                    message: "user not found"
                }
            }

            return{
                status: 200,
                message: "User found",
                response: user
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
        }
        
    }

    async getAllUsers(): Promise<BaseResponse>{
        try {
            const users = await this.userRepository.find()
            return {
                status: 200,
                message: "Users Found",
                response: users
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
        }
        
    }

    async getProductById(id: number): Promise<BaseResponse>{
        try {

            const product = await this.productRepository.findOne({
                where:{
                    productId: id
                }
            })

            if(!product){
                return{
                    status: 400,
                    message: "Product not found"
                }
            }

            return{
                status: 200,
                message: "Product found",
                response: product
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
        }
        
    }

    

}