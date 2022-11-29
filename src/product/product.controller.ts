import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IProductEntity } from './entities/product.entity';
import { PartialProductDto } from './services/dto/partialProductInput.dto';
import { ProductDto } from './services/dto/productInput.dto';
import { ProductService } from './services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async getAllProducts(): Promise<IProductEntity[]> {
    return await this.service.getAllProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id') productId: string,
  ): Promise<IProductEntity> {
    try {
      return await this.service.getProductById(productId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async createProduct(
    @Body() { name, description, image, price, scale }: ProductDto,
  ): Promise<IProductEntity> {
    try {
      return await this.service.createProduct({
        name,
        description,
        image,
        price,
        scale,
      });
    } catch (err) {
      console.log(err);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Body() productData: PartialProductDto,
  ): Promise<IProductEntity> {
    try {
      return await this.service.updateProduct(productData);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id') productId: string): Promise<string> {
    try {
      const productIsDeleted = await this.service.deleteProductById(productId);
      if (productIsDeleted) {
        return 'Product deleted successfully';
      } else {
        return 'Product not found';
      }
    } catch (err) {
      console.log(err);
    }
  }
}
