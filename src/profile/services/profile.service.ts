import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IProfileEntity } from '../entities/profile.entity';
import { ProfileRepository } from '../profile.repository';
import { PartialProfileDto } from './dto/partialProfileInput.dto';
import { ProfileDto } from './dto/profileInput.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(profile: ProfileDto): Promise<IProfileEntity> {
    const profileEntity = { ...profile, id: randomUUID() };
    const createdProfile = await this.profileRepository.createProfile(
      profileEntity,
    );
    return createdProfile;
  }

  async updateProfile(profileData: PartialProfileDto): Promise<IProfileEntity> {
    const updateProfile = await this.profileRepository.updateProfile(
      profileData,
    );
    return updateProfile;
  }

  async getAllProfiles(): Promise<IProfileEntity[]> {
    return await this.profileRepository.findAllProfile();
  }

  async deleteProfileById(profileId: string): Promise<boolean> {
    try {
      await this.profileRepository.deleteProfile(profileId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getProfileById(profileId: string): Promise<IProfileEntity> {
    const foundProfile = await this.profileRepository.findProfileById(
      profileId,
    );

    return foundProfile;
  }
}
