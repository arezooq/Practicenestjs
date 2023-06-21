import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
  HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationsPipe } from '../pipes/validation.pipe';
import { UserData } from '../decorators/userData.decorator';
import { validationExceptionFilter } from '../filters/validation-exception.filter';
import { Role } from './enums/role.enum';
import { Roles } from './roles.decorator';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationsPipe)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UseFilters(new validationExceptionFilter())
  @UsePipes(ValidationsPipe)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 201,
  })
  @ApiCreatedResponse({ description: 'Add User' })
  async addUser(@UserData(ValidationsPipe) createUserDto: CreateUserDto) {
    const generatedId = await this.userService.insertUser(createUserDto);
    return { id: generatedId };
  }
  @Get()
  async getAllUsers() {
    const users = this.userService.getUsers();
    return users;
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getUser(@Param('id') userId: string) {
    return this.userService
      .getSingleUser(userId)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      });
  }

  @Post(':id/products')
  createUserProduct(
    @Param('id', ParseIntPipe) id: string,
    @Body() createUserProductDto: CreateUserProductDto,
  ) {
    return this.userService.createUserProduct(id, createUserProductDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') userId: string,
    @Body() UserData: UpdateUserDto,
  ) {
    await this.userService.updateUser(userId, UserData);
    return null;
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
