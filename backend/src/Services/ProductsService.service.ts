import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from 'src/Entities/Product.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";


@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly userRepository: Repository<ProductEntity>,
    ){}

    async createProduct(): Promise<BaseResponse> {
        try {
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async createCategory(): Promise<BaseResponse> {
        try {
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async getAllCategories(): Promise<BaseResponse> {
        try {
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async getAllProducts(): Promise<BaseResponse> {
        try {
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async uploadProductImage(): Promise<BaseResponse> {
        try {
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }
}
