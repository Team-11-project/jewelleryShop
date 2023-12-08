import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { type } from 'os';
import { AuthModule } from './Authentication/auth.module';
import { UserEntity } from './Entities/UserEntity.entity';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ProductService } from './Services/ProductsService.service';
import { ProductEntity } from './Entities/Product.entity';
import { CategoryEntity } from './Entities/Category.entity';
import { ProductsController } from './Controllers/ProductsController.controller';
import { CartEntity } from './Entities/Cart.entity';
import { CartController } from './Controllers/CartController.controller';
import { CartService } from './Services/CartService.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(<string>process.env.PORT),
      username: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
}),
TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CartEntity, UserEntity]),
AuthModule
  ],
  controllers: [ProductsController,CartController],
  providers: [AppService, JwtGuard, JwtStrategy, ProductService,CartService],
})
export class AppModule {}
