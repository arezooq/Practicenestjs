import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(userData: CreateUserDto) {
    const newUser = new this.userModel(userData);
    const result = await newUser.save();
    return result.id;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
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
      id: user.id,
      name: user.name,
      password: user.password,
      role: user.role,
    };
  }

  async updateUser(userId: string, name: string, password: string, role: Role) {
    const updateUser = await this.findUser(userId);
    if (name) {
      updateUser.name = name;
    }
    if (password) {
      updateUser.password = password;
    }
    if (role) {
      updateUser.role = role;
    }
    updateUser.save();
  }

  async deleteUser(userId: string) {
    const deleteUser = await this.userModel.deleteOne({ _id: userId }).exec();
    console.log(deleteUser);
    if (deleteUser.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    }
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
