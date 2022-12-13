import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/prisma/database.module';
import { HomePageController } from './homePage.controller';
import { HomePageRepository } from './homePage.repository';
import { HomePageService } from './homePage.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [HomePageController],
  providers: [HomePageService, HomePageRepository],
  exports: [HomePageService],
})
export class HomePageModule {}
