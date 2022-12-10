import { PartialType } from '@nestjs/mapped-types';
import { ProfileDto } from './profileInput.dto';

export class PartialProfileDto extends PartialType(ProfileDto) {
  id: string;
}
