import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from 'src/prisma/database.module';
import { ManualController } from './manual.controller';
import { ManualRepository } from './manual.repository';
import { ManualService } from './services/manual.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ManualController],
  providers: [ManualService, ManualRepository],
  exports: [ManualService],
})
export class ManualModule {}
