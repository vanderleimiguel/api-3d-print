import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from './productInput.dto';

export class PartialProductDto extends PartialType(ProductDto) {
  id: string;
}
