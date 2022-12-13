import { Injectable } from '@nestjs/common';
import { HomePageRepository } from './homePage.repository';

@Injectable()
export class HomePageService {
  constructor(private readonly homePageRepository: HomePageRepository) {}

  async getAllHomePage() {
    return await this.homePageRepository.findAllHomePage();
  }
}
