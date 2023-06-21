import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Product } from '../products/products.model';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertUser(userData: CreateUserDto) {
    const newUser = new this.userModel(userData);
    const result = await newUser.save();
    return result.id;
  }

  async getUsers() {
    const users = await this.userModel.find({ relations: ['products'] }).exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      password: user.password,
      role: user.role,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      name: user.name,
      password: user.password,
      role: user.role,
    };
  }

  async updateUser(userId: string, userData: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate(userId, userData);
    return updateUser;
  }

  async deleteUser(userId: string) {
    const deleteUser = await this.userModel.deleteOne({ _id: userId }).exec();
    console.log(deleteUser);
    if (deleteUser.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  async createUserProduct(
    userId: string,
    createUserProductDto: CreateUserProductDto,
  ) {
    const user = await this.findUser(userId);
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newProduct = new this.productModel(createUserProductDto);
    const result = await newProduct.save();
    return result.id;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
