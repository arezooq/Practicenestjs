import { CreateProductDto } from '../dto/CreateProduct.dto';

export class Product {
  constructor(public id: string, public prodData: CreateProductDto) {}
}
