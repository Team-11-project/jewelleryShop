import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { type } from 'os';
import { AuthModule } from './Authentication/auth.module';
import { UserEntity } from './Entities/User.entity';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ProductService } from './Services/ProductsService.service';
import { ProductEntity } from './Entities/Product.entity';
import { CategoryEntity } from './Entities/Category.entity';
import { ProductsController } from './Controllers/ProductsController.controller';

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
TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
AuthModule
  ],
  controllers: [ProductsController],
  providers: [AppService, JwtGuard, JwtStrategy, ProductService],
})
export class AppModule {}
