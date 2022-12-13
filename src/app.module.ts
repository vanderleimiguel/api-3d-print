import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HomePageModule } from './homePage/homePage.module';
import { ManualModule } from './manual/manual.module';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HomePageModule,
    UserModule,
    ProfileModule,
    ManualModule,
  ],
})
export class AppModule {}
