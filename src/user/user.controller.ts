import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { adminAuthorization } from 'src/auth/decorators/admin-decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard(), adminAuthorization)
  @ApiBearerAuth()
  @Get()
  async getAllUsers(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @UseGuards(AuthGuard(), adminAuthorization)
  @ApiBearerAuth()
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<IUserEntity> {
    try {
      return await this.service.getUserById(userId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async createUser(
    @Body() { cpf, email, password, name, isAdmin }: UserDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.createUser({
        cpf,
        email,
        password,
        name,
        isAdmin,
      });

      response.status(201).send(result);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  async updateUser(
    @Body() userData: PartialUserDto,
    @userLogged() user: IUserEntity,
  ): Promise<IUserEntity> {
    try {
      return await this.service.updateUser(userData);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUserById(@Param('id') userId: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(userId);
    if (userIsDeleted) {
      return 'User deleted successfully';
    } else {
      return 'User not found';
    }
  }
}
