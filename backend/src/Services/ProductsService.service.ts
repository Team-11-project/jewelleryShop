import { CreateProductDto } from './../Dto/createProduct.dto';
import { CategoryEntity } from './../Entities/Category.entity';
import { CreateCategoryDto } from './../Dto/createCategory.dto';
import { UpdateProductDto } from './../Dto/updateProduct.dto';
import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from 'src/Entities/Product.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';


@Injectable()
export class ProductService{

    private readonly s3Client = new S3Client({region: this.configService.getOrThrow("AWS_S3_REGION")})
    private readonly s3 = new AWS.S3({
        accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.getOrThrow("AWS_SECRET_ACCESS_KEY"),
        region: this.configService.getOrThrow("AWS_S3_REGION")
    })

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        private readonly configService: ConfigService
    ){}

    async createProduct(createProductDto: CreateProductDto, fileName:string, file:Buffer): Promise<BaseResponse> {
        try {

            console.log(fileName)
            const date = new Date();

            const productFromDb = await this.productRepository.findOne({
                where: {
                    name: createProductDto.name
                }
            })
            if (productFromDb){
                return{
                    status: 400,
                    message: "product already exists",
                    response: productFromDb
                }
            }

            const category = await this.categoryRepository.find({
                where:{
                    id: createProductDto.category
                }
            })

            if(!category){
                return {
                    status: 400,
                    message: "category does not exist"
                }
            }

            let product = new ProductEntity()
            product.name = createProductDto.name
            product.price = createProductDto.price
            product.material = createProductDto.material
            product.keywords = createProductDto.keywords
            product.image = await (await this.uploadProductImage(fileName, file)).response
            product.details = createProductDto.detail
            product.stock = createProductDto.stock
            product.createdAt = date
            product.category = await this.categoryRepository.findOne({
                where:{
                    id: createProductDto.category
                }
            })

            const newProduct = await this.productRepository.save(product)

            if(product){
                return{
                    status: 200,
                    message: "product created",
                    response: newProduct
                }
            }

            return{
                status: 400,
                message: "product could not be created"
            }

            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async deleteProduct(id: number): Promise<BaseResponse> {
        try {
            const productToDelete = await this.productRepository.findOne({
                where:{
                    productId: id
                }
        });
    
            if (!productToDelete) {
                return {
                    status: 400,
                    message: "Product not found",
                };
            }
    
            // Delete the product
            await this.productRepository.remove(productToDelete);
    
            return {
                status: 200,
                message: "Product deleted successfully",
            };
        } catch (error) {
            return {
                status: 400,
                message: "Internal Server Error",
                response: error,
            };
        }
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<BaseResponse> {
        try {
            // Check if the product exists
            const existingProduct = await this.productRepository.findOne({
                where:{
                    productId: id
                }
            });
    
            if (!existingProduct) {
                return {
                    status: 400,
                    message: "Product not found",
                };
            }
    
            // Update product properties
            existingProduct.name = updateProductDto.name || existingProduct.name;
            existingProduct.price = updateProductDto.price || existingProduct.price;
            existingProduct.material = updateProductDto.material || existingProduct.material;
            existingProduct.keywords = updateProductDto.keywords || existingProduct.keywords;
            existingProduct.image = updateProductDto.image || existingProduct.image;
            existingProduct.details = updateProductDto.detail || existingProduct.details;
            existingProduct.stock = updateProductDto.stock || existingProduct.stock;
    
            // Update the product in the database
            const updatedProduct = await this.productRepository.save(existingProduct);
    
            return {
                status: 200,
                message: "Product updated successfully",
                response: updatedProduct,
            };
        } catch (error) {
            return {
                status: 400,
                message: "Internal Server Error",
                response: error,
            };
        }
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
        try {

            const categoryFromDb = await this.categoryRepository.findOne({
                where: {
                    categoryName: createCategoryDto.categoryName
                }
            })

            console.log(categoryFromDb)

            if (categoryFromDb){
                return{
                    status: 400,
                    message: "category already exists",
                    response: categoryFromDb
                }
            }
            let category = new CategoryEntity()
            category.categoryName = createCategoryDto.categoryName
            category.description = createCategoryDto.description
            const newCategory = await this.categoryRepository.save(category)

            if(newCategory)
            return{
                status: 200,
                message: "category created",
                response: newCategory
            }
            
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

            const allCategories = await this.categoryRepository.find()
            if (allCategories){
                return{
                    status: 200,
                    message: "categories found",
                    response: allCategories
                }
            }
            return{
                status: 400,
                message: "there are no categories",
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async getAllProductsWithPagination(skip: number): Promise<BaseResponse> {
        try {
            const allProducts = await this.productRepository.find({
                order: {
                    productId: 'ASC' 
                },
                take: 6,
                skip: skip
            })
            if (allProducts){
                return{
                    status: 200,
                    message: "products found",
                    response: allProducts
                }
            }
            return{
                status: 400,
                message: "there are no products",
            }
            
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
            const allProducts = await this.productRepository.find({
                order: {
                    productId: 'ASC' 
                },
                relations:["category"]
            })
            if (allProducts){
                return{
                    status: 200,
                    message: "products found",
                    response: allProducts
                }
            }
            return{
                status: 400,
                message: "there are no products",
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async getAllProductsCount(): Promise<number>{
        const allProducts = await this.productRepository.find()
        const count = allProducts.length
        return count;
    }

    async uploadProductImage(fileName: string, file:Buffer): Promise<BaseResponse> {
        try {
            let img = await this.s3.upload({
                Bucket: 'regalia-storage',
                Key:fileName,
                Body:file,
                ContentType: 'image/jpeg'
            }).promise()
            return{
                status: 200,
                message:"done",
                response:img.Location
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
            
        }
    }

    async updateCategory(id: number, createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
        try {

            const categoryFromDb = await this.categoryRepository.findOne({
                where: {
                    id: id
                }
            })

            if(!categoryFromDb){
                return{
                    status: 400,
                    message: "category not found",
                }
            }

            categoryFromDb.categoryName = createCategoryDto.categoryName
            const update = await this.categoryRepository.update(id, categoryFromDb)

            return{
                status: 200,
                message: "category updated",
                response: update
            }

            
        } catch (error) {
            return{
                status: 400,
                message: "Bad request",
                response: error
            }
        }
    }

    async getProductById(id: number): Promise<BaseResponse>{
        try {

            const product = await this.productRepository.findOne({
                where:{
                    productId: id
                },
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

    async getProductByCategory(Category: string): Promise<BaseResponse>{
        try {

            const product = await this.categoryRepository.find({
                where:{
                    categoryName: Category
                }
            })

            if(!product){
                return{
                    status: 400,
                    message: "No products"
                }
            }

            return{
                status: 200,
                message: "Products found",
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
