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
import { userLogged } from 'utils/auth/decorators/user-logged.decorator';
import { IManualEntity } from './entities/manual.entity';
import { ManualDto } from './services/dto/manualInput.dto';
import { PartialManualDto } from './services/dto/partialManualInput.dto';
import { ManualService } from './services/manual.service';
import { Response } from 'express';

@Controller('manual')
@ApiTags('Manuals')
export class ManualController {
  constructor(private readonly service: ManualService) {}

  @Get()
  async getAllManual(): Promise<IManualEntity[]> {
    return await this.service.getAllManuals();
  }

  @Get(':id')
  async getManualById(@Param('id') manualId: string): Promise<IManualEntity> {
    try {
      return await this.service.getManualById(manualId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  async createManual(
    @Body() { title, url, description }: ManualDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createManual({
        title,
        url,
        description,
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async updateManual(
    @Body() manualData: PartialManualDto,
    @userLogged() profile: IManualEntity,
  ): Promise<IManualEntity> {
    try {
      return await this.service.updateManual(manualData);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async deleteManualById(@Param('id') manualId: string): Promise<string> {
    const manualIsDeleted = await this.service.deleteManualById(manualId);
    if (manualIsDeleted) {
      return 'Manual deleted successfully';
    } else {
      return 'Manual not found';
    }
  }
}
