import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { type } from 'os';

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
TypeOrmModule.forFeature([])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
