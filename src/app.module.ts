import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';
import { ManualModule } from './manual/manual.module';

@Module({
  imports: [DatabaseModule, ProfileModule, ArticleModule, ManualModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
