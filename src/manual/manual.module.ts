import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/prisma/database.module';
import { ManualController } from './manual.controller';
import { ManualRepository } from './manual.repository';
import { ManualService } from './services/manual.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ManualController],
  providers: [ManualService, ManualRepository],
  exports: [ManualService],
})
export class ManualModule {}
