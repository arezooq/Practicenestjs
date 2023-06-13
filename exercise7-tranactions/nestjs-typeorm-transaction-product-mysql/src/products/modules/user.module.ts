import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../typeorm/entities/User';
import { Product } from '../../typeorm/entities/Product';
import { Cart } from '../../typeorm/entities/Cart';
import { Event } from '../../typeorm/entities/event';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Cart, Event])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
