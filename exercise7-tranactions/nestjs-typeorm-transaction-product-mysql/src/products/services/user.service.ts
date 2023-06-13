import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../typeorm/entities/User';
import { Repository, DataSource } from 'typeorm';
import {
  CreateUserParams,
  CreateUserProductParams,
  CreateUserCartParams,
  UpdateUserParams,
  CreateUserEventLikeParams,
} from '../utils/types';
import { Product } from '../../typeorm/entities/Product';
import { Cart } from '../../typeorm/entities/Cart';
import { Event } from '../../typeorm/entities/event';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private datasource: DataSource,
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

  async createUserEventLike(eventLike: CreateUserEventLikeParams) {
    const user = await this.userRepository.findOneBy({
      id: eventLike.userId,
    });

    const event = this.datasource.manager.transaction(
      async (transactionalManager) => {
        const product = await transactionalManager.findOneBy(Product, {
          id: eventLike.productId,
        });

        let event = new Event({
          ...eventLike,
          user,
          product,
        });

        event = await transactionalManager.save(event);

        product.likeCount = (product.likeCount || 0) + 1;
        await transactionalManager.save(product);

        return event;
      },
    );

    return event;
  }

  // queryRunner

  async createUserLike(eventLike: CreateUserEventLikeParams) {
    const user = await this.userRepository.findOneBy({
      id: eventLike.userId,
    });

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.findOneBy(Product, {
        id: eventLike.productId,
      });

      let event = new Event({
        ...eventLike,
        user,
        product,
      });

      event = await queryRunner.manager.save(event);

      product.likeCount = (product.likeCount || 0) + 1;
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();

      return event;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
