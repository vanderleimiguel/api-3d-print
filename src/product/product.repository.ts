import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IProductEntity } from './entities/product.entity';
import { PartialProductDto } from './services/dto/partialProductInput.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(product: IProductEntity): Promise<IProductEntity> {
    const CreatedProduct = await this.prisma.product.create({ data: product });
    return CreatedProduct;
  }

  async updateProduct(product: PartialProductDto): Promise<IProductEntity> {
    const UpdatedProduct = await this.prisma.product.update({
      where: { id: product.id },
      data: product,
    });
    return UpdatedProduct;
  }

  async deleteProduct(id: string): Promise<IProductEntity> {
    const deletedProduct = await this.prisma.product.delete({
      where: { id: id },
    });
    return deletedProduct;
  }

  async findAllProducts(): Promise<IProductEntity[]> {
    const allProducts = await this.prisma.product.findMany();
    return allProducts;
  }

  async findProductById(id: string): Promise<IProductEntity> {
    const foundProduct = await this.prisma.product.findUniqueOrThrow({
      where: { id: id },
    });

    return foundProduct;
  }
}
