import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { ProductService } from './product/services/product.service';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, ProductController],
  providers: [UserService, UserRepository, ProductService, ProductRepository],
})
export class AppModule {}
