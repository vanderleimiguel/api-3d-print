import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'familia',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'imagem do usuario',
    example: '',
  })
  imageUrl: string;

  @ApiProperty()
  userId: string;
}
