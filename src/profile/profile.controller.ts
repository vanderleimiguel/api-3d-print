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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IProfileEntity } from './entities/profile.entity';
import { PartialProfileDto } from './services/dto/partialProfileInput.dto';
import { ProfileDto } from './services/dto/profileInput.dto';
import { ProfileService } from './services/profile.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async getAllProfile(): Promise<IProfileEntity[]> {
    return await this.service.getAllProfiles();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async getProfileById(
    @Param('id') profileId: string,
  ): Promise<IProfileEntity> {
    try {
      return await this.service.getProfileById(profileId);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async createProfile(
    @Body() { title, imageUrl, userId }: ProfileDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createProfile({
        title,
        imageUrl,
        userId,
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
  async updateProfile(
    @Body() profileData: PartialProfileDto,
    @userLogged() profile: IProfileEntity,
  ): Promise<IProfileEntity> {
    try {
      return await this.service.updateProfile(profileData);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  async deleteProfileById(@Param('id') profileId: string): Promise<string> {
    const profileIsDeleted = await this.service.deleteProfileById(profileId);
    if (profileIsDeleted) {
      return 'Profile deleted successfully';
    } else {
      return 'Profile not found';
    }
  }
}
