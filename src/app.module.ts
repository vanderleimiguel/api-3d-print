import { Module } from '@nestjs/common';
import { ManualModule } from './manual/manual.module';
import { DatabaseModule } from './prisma/database.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ProfileModule, ManualModule, UserModule],
})
export class AppModule {}
