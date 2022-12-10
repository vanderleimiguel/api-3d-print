import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/prisma/database.module';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
