import { PartialType } from '@nestjs/mapped-types';
import { ManualDto } from './manualInput.dto';

export class PartialManualDto extends PartialType(ManualDto) {
  id: string;
}
