import { ProductService } from './../Services/ProductsService.service';
import { Body, Controller, Get, Post, UseGuards, Param, Delete, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Roles } from 'src/Decorators/role.decorator';
import { CreateCategoryDto } from 'src/Dto/createCategory.dto';
import { UpdateProductDto } from './../Dto/updateProduct.dto';
import { CreateProductDto } from 'src/Dto/createProduct.dto';
import { Role } from 'src/Entities/Role.enum';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags("Products Controller")
@Controller("products")
export class ProductsController{
    constructor(
        private productService: ProductService
      
    ){}


    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
            type: 'string'
        },
        keywords: {
           type:  'string'
        },
        material: {
            type: 'string'
        },
        detail: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        stock: {
        type: 'number'
        },
        category: {
            type: 'number'
        },
      },
    },
  })
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor("file"))
    @Post("create-product")
    async createProduct(@UploadedFile(new ParseFilePipe({validators: [new FileTypeValidator({fileType: 'image/jpeg'})], fileIsRequired: false})) file: Express.Multer.File, @Body() createProductDto: CreateProductDto): Promise<BaseResponse> {
      if (file){
        return this.productService.createProduct(createProductDto, file.originalname, file.buffer);

      }
        return this.productService.createProduct(createProductDto);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post("create-category")
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
        return this.productService.createCategory(createCategoryDto);
    }

    // @UseGuards(JwtGuard)
    @Get("get-all-categories")
    async getAllCategories(): Promise<BaseResponse> {
       return this.productService.getAllCategories()
    }

    // @UseGuards(JwtGuard)
    @Get("get-all-products-with-pagination/:skip")
    async getAllProductsWithPagination(@Param("skip") skip:number): Promise<BaseResponse> {
       return this.productService.getAllProductsWithPagination(skip)
    }

    // @UseGuards(JwtGuard)
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
    @Put("update-category/:id")
    async updateCategory(@Param('id') id: number, @Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
       return this.productService.updateCategory(id, createCategoryDto)
    }

    // @UseGuards(JwtGuard)
    @Get("getProductById/:productId")
    async getProductById(@Param("productId") productId: number): Promise<BaseResponse> {
        return await this.productService.getProductById(productId);
    }


    // @UseGuards(JwtGuard)
    @Get("getProductByCategory/:categoyName")
    async getProductByCategory(@Param("categoryName") categoryName: string): Promise<BaseResponse> {
        return await this.productService.getProductByCategory(categoryName);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('deleteproduct/:id')
        async deleteProduct(@Param('id') productId: number) {
        return await this.productService.deleteProduct(productId);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete('deleteCategory/:name')
        async deleteCategory(@Param('name') categoryName: string) {
        return await this.productService.deleteCategory(categoryName);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Put(':id')
        async updateProduct(@Param('id') productId: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.updateProduct(productId, updateProductDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post("upload-file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile(
    new ParseFilePipe({
        validators: [
            // new MaxFileSizeValidator({maxSize: 300000}),
            new FileTypeValidator({fileType: 'image/jpeg'})
        ]
    })
  ) file: Express.Multer.File){
    return await this.productService.uploadProductImage(file.originalname, file.buffer)
  }


}
