import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'utils/exceptions/exception';
import { Exceptions } from 'utils/exceptions/exceptionsHelper';
import { IManualEntity } from './entities/manual.entity';
import { PartialManualDto } from './services/dto/partialManualInput.dto';

@Injectable()
export class ManualRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createManual(manual: IManualEntity): Promise<IManualEntity> {
    try {
      const CreatedManual = await this.prisma.manual.create({
        data: manual,
      });
      return CreatedManual;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException, 'Erro ao criar Manual');
    }
  }

  async updateManual(manual: PartialManualDto): Promise<IManualEntity> {
    try {
      const UpdatedManual = await this.prisma.manual.update({
        where: { id: manual.id },
        data: manual,
      });
      return UpdatedManual;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteManual(id: string): Promise<IManualEntity> {
    try {
      const deletedManual = await this.prisma.manual.delete({
        where: { id: id },
      });
      return deletedManual;
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'manual not found in database',
      );
    }
  }

  async findAllManual(): Promise<IManualEntity[]> {
    try {
      const allManuals = await this.prisma.manual.findMany();
      return allManuals;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findManualById(id: string): Promise<IManualEntity> {
    try {
      const foundManual = await this.prisma.manual.findUniqueOrThrow({
        where: { id: id },
      });

      return foundManual;
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
