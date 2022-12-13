import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ManualDto {
  @ApiProperty({
    description: 'Titulo do manual',
    example: 'Siemens',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'endereço do manual',
    example: '',
  })
  url: string;

  @ApiProperty({
    description: 'descrição do manual',
    example: 'manual da maquina x',
  })
  description: string;

  @ApiProperty({
    description: 'id do perfil',
    example: '',
  })
  profileId?: string;
}
