import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../typeorm/entities/User';
import { Repository } from 'typeorm';
import {
  CreateUserParams,
  CreateUserProductParams,
  CreateUserCartParams,
  UpdateUserParams,
} from '../utils/types';
import { Product } from '../../typeorm/entities/Product';
import { Cart } from '../../typeorm/entities/Cart';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  findUsers() {
    // return this.userRepository.find();
    return this.userRepository.find({ relations: ['products', 'carts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async createUserProduct(
    id: number,
    createUserProductDetails: CreateUserProductParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newProduct = this.productRepository.create(createUserProductDetails);
    const saveProduct = await this.productRepository.save(newProduct);
    user.products.push(saveProduct);
    return this.userRepository.save(user);
  }

  async createUserCart(
    id: number,
    createUserCartDetails: CreateUserCartParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newCart = this.cartRepository.create(createUserCartDetails);
    const saveCart = await this.cartRepository.save(newCart);
    user.cart = saveCart;
    return this.userRepository.save(user);
  }
}
