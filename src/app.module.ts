import { Module } from '@nestjs/common';
import { AuthModule } from 'utils/auth/auth.module';
import { ManualModule } from './manual/manual.module';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProfileModule,
    ManualModule,
    UserModule,
  ],
})
export class AppModule {}
