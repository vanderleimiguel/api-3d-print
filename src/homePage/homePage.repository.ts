import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomePageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllHomePage() {
    const allHomePage = await this.prisma.profile.findMany({
      // select: {
      //   id: true,
      //   name: true,
      //   email: true,
      //   profiles: {
      //     select: {
      //       title: true,
      //       imageUrl: true,
      //     },
      //   },
      // },

      select: {
        userId: true,
        id: true,
        title: true,
        imageUrl: true,
        manuals: {
          select: {
            title: true,
            description: true,
            url: true,
          },
        },
      },
    });
    return allHomePage;
  }
}
