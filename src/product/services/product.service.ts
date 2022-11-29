import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/productInput.dto';
import { IProductEntity } from '../entities/product.entity';
import { PartialProductDto } from './dto/partialProductInput.dto';
import { ProductRepository } from '../product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: ProductDto): Promise<IProductEntity> {
    const productEntity = { ...product, id: randomUUID() };
    const createdProduct = await this.productRepository.createProduct(
      productEntity,
    );
    return createdProduct;
  }

  async updateProduct(productData: PartialProductDto): Promise<IProductEntity> {
    const updateProduct = await this.productRepository.updateProduct(
      productData,
    );
    return updateProduct;
  }

  async getAllProducts(): Promise<IProductEntity[]> {
    return await this.productRepository.findAllProducts();
  }

  async deleteProductById(productId: string): Promise<boolean> {
    try {
      await this.productRepository.deleteProduct(productId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getProductById(productId: string): Promise<IProductEntity> {
    const foundProduct = await this.productRepository.findProductById(
      productId,
    );
    return foundProduct;
  }
}
