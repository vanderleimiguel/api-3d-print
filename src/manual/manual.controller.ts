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
import { IManualEntity } from './entities/manual.entity';
import { ManualDto } from './services/dto/manualInput.dto';
import { PartialManualDto } from './services/dto/partialManualInput.dto';
import { ManualService } from './services/manual.service';
import { Response } from 'express';
import { userLogged } from 'src/auth/decorators/user-logged.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('manual')
@ApiTags('Manuals')
export class ManualController {
  constructor(private readonly service: ManualService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async getAllManual(): Promise<IManualEntity[]> {
    return await this.service.getAllManuals();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  async getManualById(@Param('id') manualId: string): Promise<IManualEntity> {
    try {
      return await this.service.getManualById(manualId);
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  async createManual(
    @Body() { title, url, description, profileId }: ManualDto,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const result = await this.service.createManual({
        title,
        url,
        description,
        profileId,
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

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
