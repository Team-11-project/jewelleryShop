import { CreateProductDto } from './../Dto/createProduct.dto';
import { CategoryEntity } from './../Entities/Category.entity';
import { CreateCategoryDto } from './../Dto/createCategory.dto';
import { UpdateProductDto } from './../Dto/updateProduct.dto';
import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from 'src/Entities/Product.entity';
import { CartEntity } from 'src/Entities/Cart.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { Repository } from "typeorm";
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';
import { Review } from 'src/Entities/Review.entity';
import { CreateReviewDto } from 'src/dto/createReview.dto';


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
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly configService: ConfigService,
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
    ){}

    async createProduct(createProductDto: CreateProductDto, fileName?:string, file?:Buffer): Promise<BaseResponse> {
        try {

            // console.log(fileName)
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
            if(fileName){
            product.image = await (await this.uploadProductImage(fileName, file)).response
            }
            product.details = createProductDto.detail
            product.stock = createProductDto.stock
            product.createdAt = date
            product.category = await this.categoryRepository.findOne({
                where:{
                    id: createProductDto.category
                }
            })

            const newProduct = await this.productRepository.save(product)
            console.log(newProduct)

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
            console.log(error)
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

    // In your CategoryService
async deleteCategory(name: string): Promise<BaseResponse> {
    try {
        // Find the category to delete
        const categoryToDelete = await this.categoryRepository.findOne({
            where: {
                categoryName: name,
            },
            relations: ['products'], // Assuming 'products' is the relation name in CategoryEntity
        });

        if (!categoryToDelete) {
            return {
                status: 404,
                message: "Category not found",
            };
        }

        // Delete all products associated with the category
        if (categoryToDelete.products && categoryToDelete.products.length > 0) {
            await this.productRepository.remove(categoryToDelete.products);
        }

        // Delete the category
        await this.categoryRepository.remove(categoryToDelete);

        return {
            status: 200,
            message: "Category and associated products deleted successfully",
        };
    } catch (error) {
        return {
            status: 500,
            message: "Internal Server Error",
            response: error.message || error,
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
            categoryFromDb.description = createCategoryDto.description
            await this.categoryRepository.update(id, categoryFromDb)
            const updated = await this.categoryRepository.findOne({
                where:{
                    id:id
                }
            })

            return{
                status: 200,
                message: "category updated",
                response: updated
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

            const product = await this.productRepository.find({
                where: {
                    category: { categoryName: Category },
                },
            });

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

    async createReview(createReviewDto: CreateReviewDto): Promise<BaseResponse> {
        try {
            console.log(createReviewDto)
            const review = new Review()
            const prod = await this.productRepository.findOne({where : {productId: createReviewDto.productId}})
            review.content = createReviewDto.content
            review.product = prod
            review.rating = createReviewDto.rating
            review.title = createReviewDto.title
            const newReview = await this.reviewRepository.save(review);
            if(newReview)
            return{
                status: 200,
                message: "review created",
                response: newReview
            }
            return{
                status: 400,
                message: "review not created",
            }
            
        } catch (error) {
            return{
                status: 400,
                message: "Bad Request",
                response: error.detail
            }
            
        }
        
      }
    
      async findByProductId(productId: number): Promise<BaseResponse> {
        try {
            const reviews = await this.reviewRepository.find({
                where: { product: { productId: productId } },
              });

              if(!reviews){
                  return{
                      status: 400,
                      message: "No reviews for product"
                  }
              }
              return{
                status: 200,
                message: "reviews found",
                response: reviews
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
