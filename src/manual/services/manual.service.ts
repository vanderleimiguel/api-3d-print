import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IManualEntity } from '../entities/manual.entity';
import { ManualRepository } from '../manual.repository';
import { ManualDto } from './dto/manualInput.dto';
import { PartialManualDto } from './dto/partialManualInput.dto';

@Injectable()
export class ManualService {
  constructor(private readonly manualRepository: ManualRepository) {}

  async createManual(manual: ManualDto): Promise<IManualEntity> {
    const manualEntity = { ...manual, id: randomUUID() };
    const createdManual = await this.manualRepository.createManual(
      manualEntity,
    );
    return createdManual;
  }

  async updateManual(manualData: PartialManualDto): Promise<IManualEntity> {
    const updateManual = await this.manualRepository.updateManual(manualData);
    return updateManual;
  }

  async getAllManuals(): Promise<IManualEntity[]> {
    return await this.manualRepository.findAllManual();
  }

  async deleteManualById(manualId: string): Promise<boolean> {
    try {
      await this.manualRepository.deleteManual(manualId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getManualById(manualId: string): Promise<IManualEntity> {
    const foundManual = await this.manualRepository.findManualById(manualId);

    return foundManual;
  }
}
