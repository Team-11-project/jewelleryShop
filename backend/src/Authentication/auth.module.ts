import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { AuthService } from './AuthService.service';
import { AuthController } from './AuthController.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '3600s' },
            }),
          }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
    
  })
  export class AuthModule {}