import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { ProductRepository } from './product/product.repository';
import { ProductService } from './product/services/product.service';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ProductService, ProductRepository],
})
export class AppModule {}
