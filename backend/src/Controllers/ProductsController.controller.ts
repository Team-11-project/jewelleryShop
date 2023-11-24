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
    @Post("createProduct")
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<BaseResponse> {
        return this.productService.createProduct(createProductDto);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("createCategory")
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
        return this.productService.createCategory(createCategoryDto);
    }

    @UseGuards(JwtGuard)
    @Get("getAllCategories")
    async getAllCategories(): Promise<BaseResponse> {
       return this.productService.getAllCategories()
    }

    @UseGuards(JwtGuard)
    @Get("getAllProducts")
    async getAllProducts(): Promise<BaseResponse> {
       return this.productService.getAllProducts()
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("uploadImage")
    async uploadProductImage(): Promise<BaseResponse> {
       return this.productService.uploadProductImage()
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.USER)
    @Get("getProductById")
    async getProductById(@Param("productId") productId: number): Promise<BaseResponse> {
        return await this.productService.getProductById(productId);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.USER)
    @Get("getProductByCategory")
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
