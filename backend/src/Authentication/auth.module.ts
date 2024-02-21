import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { ProductEntity } from "src/Entities/Product.entity";
import { AuthService } from './AuthService.service';
import { AuthController } from './AuthController.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from 'src/Mail/MailService.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '3600s' },
            }),
          }),
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    providers: [AuthService, MailService],
    controllers: [AuthController],
    exports: [],
    
  })
  export class AuthModule {}