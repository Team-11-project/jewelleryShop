import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { AuthService } from './AuthService.service';
import { AuthController } from './AuthController.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
    
  })
  export class AuthModule {}