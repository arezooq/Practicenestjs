import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(prodData: CreateProductDto) {
    const newProduct = new this.productModel(prodData);
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
  }

  async deleteProduct(prodId: string) {
    const deleteProd = await this.productModel
      .deleteOne({ _id: prodId })
      .exec();
    console.log(deleteProd);
    if (deleteProd.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
