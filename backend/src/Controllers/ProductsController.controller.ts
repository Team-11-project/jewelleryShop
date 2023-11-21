import { ProductService } from './../Services/ProductsService.service';
import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Products Controller")
@Controller("products")
export class AuthController{
    constructor(
        private productService: ProductService
    ){}

}
