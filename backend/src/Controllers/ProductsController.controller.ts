import { ProductService } from './../Services/ProductsService.service';
import { Body, Controller, Get, Post, UseGuards, Param, Delete, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from 'src/Decorators/role.decorator';
import { CreateCategoryDto } from 'src/Dto/createCategory.dto';
import { UpdateProductDto } from './../Dto/updateProduct.dto';
import { CreateProductDto } from 'src/Dto/createProduct.dto';
import { Role } from 'src/Entities/Role.enum';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@ApiBearerAuth()
@ApiTags("Products Controller")
@Controller("products")
export class ProductsController{
    constructor(
        private productService: ProductService
    ){}


    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("create-product")
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<BaseResponse> {
        return this.productService.createProduct(createProductDto);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("create-category")
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
        return this.productService.createCategory(createCategoryDto);
    }

    @UseGuards(JwtGuard)
    @Get("get-all-categories")
    async getAllCategories(): Promise<BaseResponse> {
       return this.productService.getAllCategories()
    }

    @UseGuards(JwtGuard)
    @Get("get-all-products-with-pagination/:skip")
    async getAllProductsWithPagination(@Param("skip") skip:number): Promise<BaseResponse> {
       return this.productService.getAllProductsWithPagination(skip)
    }

    @UseGuards(JwtGuard)
    @Get("get-all-products")
    async getAllProducts(): Promise<BaseResponse> {
       return this.productService.getAllProducts()
    }

    @UseGuards(JwtGuard)
    @Get("get-all-products-count")
    async getAllProductsCount():  Promise<number> {
       return this.productService.getAllProductsCount()
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("upload-product-image")
    async uploadProductImage(): Promise<BaseResponse> {
       return this.productService.uploadProductImage()
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put("update-category/:id")
    async updateCategory(@Param('id') id: number, @Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
       return this.productService.updateCategory(id, createCategoryDto)
    }

    @UseGuards(JwtGuard)
    @Get("getProductById/:productId")
    async getProductById(@Param("productId") productId: number): Promise<BaseResponse> {
        return await this.productService.getProductById(productId);
    }


    @UseGuards(JwtGuard)
    @Get("getProductByCategory/:categoyName")
    async getProductByCategory(@Param("categoryName") categoryName: string): Promise<BaseResponse> {
        return await this.productService.getProductByCategory(categoryName);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
        async deleteProduct(@Param('id') productId: number) {
        return await this.productService.deleteProduct(productId);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
        async updateProduct(@Param('id') productId: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(productId, updateProductDto);
  }


}
