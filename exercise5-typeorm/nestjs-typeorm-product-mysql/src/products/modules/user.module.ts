import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../../typeorm/entities/User';
import { Product } from '../../typeorm/entities/Product';
import { Cart } from '../../typeorm/entities/Cart';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Cart])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
