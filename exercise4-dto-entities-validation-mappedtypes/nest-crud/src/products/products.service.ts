import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(prodData: CreateProductDto) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, prodData);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, prodData: UpdateProductDto) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    console.log(updateProduct);
    if (prodData.title) {
      updateProduct.prodData.title = prodData.title;
    }
    if (prodData.description) {
      updateProduct.prodData.description = prodData.description;
    }
    if (prodData.price) {
      updateProduct.prodData.price = prodData.price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
