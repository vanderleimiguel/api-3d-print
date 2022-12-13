import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { adminAuthorization } from 'src/auth/decorators/admin-decorator';
import { HomePageService } from './homePage.service';

@Controller('homePage')
@ApiTags('HomePage')
export class HomePageController {
  constructor(private readonly service: HomePageService) {}

  @UseGuards(AuthGuard(), adminAuthorization)
  @ApiBearerAuth()
  @Get()
  async getAllHomePage() {
    return await this.service.getAllHomePage();
  }
}
