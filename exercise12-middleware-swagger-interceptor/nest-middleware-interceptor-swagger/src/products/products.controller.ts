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
  CacheTTL,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { ProductsService } from './products.service';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { ValidationsPipe } from '../pipes/validation.pipe';
import { ProductData } from '../decorators/productdata.decorator';
import { validationExceptionFilter } from '../filters/validation-exception.filter';
import { BenchmarkInterceptor } from 'src/interceptors/benchmark.interceptor';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationsPipe)
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseFilters(new validationExceptionFilter())
  @UsePipes(ValidationsPipe)
  async addProduct(
    @ProductData(ValidationsPipe) createProductDto: CreateProductDto,
  ) {
    const generatedId = await this.productService.insertProduct(
      createProductDto,
    );
    return { id: generatedId };
  }
  @Get()
  @CacheKey('allProducts')
  @CacheTTL(15)
  async getAllProducts() {
    const products = this.productService.getProducts();
    return products;
  }

  @Get(':id')
  @CacheTTL(30)
  @UseFilters(HttpExceptionFilter)
  getProduct(@Param('id') prodId: string) {
    return this.productService
      .getSingleProduct(prodId)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() prodData: UpdateProductDto,
  ) {
    await this.productService.updateProduct(prodId, prodData);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
