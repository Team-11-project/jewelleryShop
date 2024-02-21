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
// const file = fs.readFileSync(path.resolve(__dirname, "../global-bundle.pem"));
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
            user: 'regalia912@gmail.com',
            pass: 'mmhnksmrwzozoxqh'
        },
    },
    defaults:
    {
      from: '"Regalia-No-Reply" <regalia912@gmail.com>'
    }
    }),
    AuthModule,
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
      entities: [ProductEntity, CategoryEntity, UserEntity],
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
TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CartEntity, UserEntity, OrderEntity]),

  ],
  controllers: [ProductsController,CartController],
  providers: [AppService, JwtGuard, JwtStrategy, ProductService,CartService, MailService],
})
export class AppModule {}


