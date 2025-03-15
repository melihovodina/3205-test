import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUrlDto } from './dtos/createUrl.dto';
import { UrlModel } from './models/url.model';
import * as cuid from 'cuid';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async shortUrl(createUrlDto: CreateUrlDto): Promise<UrlModel> {
    const shortUrl = createUrlDto.alias || cuid()

    const newUrl = await this.prisma.url.create({
      data: {
        originalUrl: createUrlDto.originalUrl,
        shortUrl,
        expiresAt: createUrlDto.expiresAt,
        alias: createUrlDto.alias,
      },
    });

    return newUrl
  }

  async findUrlByShortUrl(shortUrl: string): Promise<UrlModel> {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url;
  }
}
