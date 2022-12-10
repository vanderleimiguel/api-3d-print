import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'utils/exceptions/exception';
import { Exceptions } from 'utils/exceptions/exceptionsHelper';
import { IProfileEntity } from './entities/profile.entity';
import { PartialProfileDto } from './services/dto/partialProfileInput.dto';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(profile: IProfileEntity): Promise<IProfileEntity> {
    try {
      const CreatedProfile = await this.prisma.profile.create({
        data: profile,
      });
      return CreatedProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, 'Erro ao criar perfil');
    }
  }

  async updateProfile(profile: PartialProfileDto): Promise<IProfileEntity> {
    try {
      const UpdatedProfile = await this.prisma.profile.update({
        where: { id: profile.id },
        data: profile,
      });
      return UpdatedProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteProfile(id: string): Promise<IProfileEntity> {
    try {
      const deletedProfile = await this.prisma.profile.delete({
        where: { id: id },
      });
      return deletedProfile;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'profile not found in database',
      );
    }
  }

  async findAllProfile(): Promise<IProfileEntity[]> {
    try {
      const allProfiles = await this.prisma.profile.findMany();
      return allProfiles;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findProfileById(id: string): Promise<IProfileEntity> {
    try {
      const foundProfile = await this.prisma.profile.findUniqueOrThrow({
        where: { id: id },
      });

      return foundProfile;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
