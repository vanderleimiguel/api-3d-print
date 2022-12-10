import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Nome do usuario',
    example: 'Vanderlei',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'email do usuario',
    example: 'vanderlei@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'cpf do usuario', example: '04168875582' })
  @IsString()
  cpf: string;

  @ApiProperty()
  isAdmin: boolean;
}
