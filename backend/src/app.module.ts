import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { type } from 'os';
import { AuthModule } from './Authentication/auth.module';
import { UserEntity } from './Entities/UserEntity.entity';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ProductService } from './Services/ProductsService.service';
import { ProductEntity } from './Entities/Product.entity';
import { CategoryEntity } from './Entities/Category.entity';
import { ProductsController } from './Controllers/ProductsController.controller';
import * as fs from 'fs';
import { join } from 'path';
// import "../global-bundle.pem"
import { CartEntity } from './Entities/Cart.entity';
import { CartController } from './Controllers/CartController.controller';
import { CartService } from './Services/CartService.service';

import path from "path";
import { OrderEntity } from './Entities/Order.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './Mail/MailService.service';
<<<<<<< HEAD
import { ContactController } from './Controllers/contact.controller';
import { ContactService } from './Services/contact.service';

=======
import { OrdersController } from './Controllers/OrdersController.controller';
import { OrderService } from './Services/OrderService.service';

import { ReviewEntity } from './Entities/Review.entity';
import { ReviewService } from './Services/ReviewService.service';
import { ReviewController } from './Controllers/ReviewController.controller';

import { FavoriteEntity } from './Entities/Favorite.entity';
import { FavoritesService } from './Services/FavoriteService.service';
import { FavoritesController } from './Controllers/FavoriteController.controller';
import { PaymentInfoEntity } from './Entities/PaymentInfo.entity';
import { AddressEntity } from './Entities/Address.entity';
>>>>>>> 1f15d0971b4cf145a56c328703a86ebedba73443
// const file = fs.readFileSync(path.resolve(__dirname, "../global-bundle.pem"));
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    },
    template: {
      dir: join(__dirname, 'Mail/MailTemplates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
    }
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(<string>process.env.PORT),
      username: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entities: [ CategoryEntity, UserEntity, ReviewEntity,ProductEntity,FavoriteEntity, PaymentInfoEntity, AddressEntity],
      // ssl: {
      //   ca: process.env.CERT,
      // },
      // extra:{
      //   // encrypt: true,
      //   trustServerCertificate: true
      // }
      // ssl:{
      //   ca: fs.readFileSync("/Users/ruka/Desktop/team-11/jewelleryShop/backend/global-bundle.pem"),
        // cert: fs.readFileSync("../backend/global-bundle.pem"),
        // key: fs.readFileSync("../global-bundle.pem")
        // rejectUnauthorized: false
      // }
      // ssl:{
      //   ca: fs.readFileSync("global-bundle.pem"),
      //   // rejectUnauthorized: false
      // },
      // extra: { 
      //   trustServerCertificate: false,
      //   Encrypt: true,
      //   IntegratedSecurity: false,
      //   }
}),
TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CartEntity, UserEntity, OrderEntity, ReviewEntity,FavoriteEntity, PaymentInfoEntity, AddressEntity]),

  ],
<<<<<<< HEAD
  controllers: [ProductsController,CartController, ContactController],
  providers: [AppService, JwtGuard, JwtStrategy, ProductService,CartService, MailService]
=======
  controllers: [ProductsController,CartController,OrdersController, ReviewController, FavoritesController],
  providers: [AppService, JwtGuard, JwtStrategy, ProductService,CartService, MailService, OrderService, ReviewService, FavoritesService],
>>>>>>> 1f15d0971b4cf145a56c328703a86ebedba73443
})
export class AppModule {}


