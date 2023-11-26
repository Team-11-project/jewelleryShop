import { CreateProductDto } from './../Dto/createProduct.dto';
import { CategoryEntity } from './../Entities/Category.entity';
import { CreateCategoryDto } from './../Dto/createCategory.dto';
import { UpdateProductDto } from './../Dto/updateProduct.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from 'src/Entities/Product.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";


@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ){}

    async createProduct(createProductDto: CreateProductDto): Promise<BaseResponse> {
        try {

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
            product.image = createProductDto.image
            product.details = createProductDto.detail
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

    async getAllProducts(): Promise<BaseResponse> {
        try {
            const allProducts = await this.productRepository.find()
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
