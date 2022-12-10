import { ProfileDto } from '../services/dto/profileInput.dto';

export interface IProfileEntity extends ProfileDto {
  id: string;
}
