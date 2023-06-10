import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { CreateUserProductDto } from '../dtos/CreateUserProduct.dto';
import { CreateUserCartDto } from '../dtos/CreateUserCart.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/products')
  createUserProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProductDto: CreateUserProductDto,
  ) {
    return this.userService.createUserProduct(id, createUserProductDto);
  }

  @Post(':id/cart')
  createUserCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserCartDto: CreateUserCartDto,
  ) {
    return this.userService.createUserCart(id, createUserCartDto);
  }
}
