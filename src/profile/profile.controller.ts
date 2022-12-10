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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { IProfileEntity } from './entities/profile.entity';
import { PartialProfileDto } from './services/dto/partialProfileInput.dto';
import { ProfileDto } from './services/dto/profileInput.dto';
import { ProfileService } from './services/profile.service';
import { Response } from 'express';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  async getAllProfile(): Promise<IProfileEntity[]> {
    return await this.service.getAllProfiles();
  }

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
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

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
