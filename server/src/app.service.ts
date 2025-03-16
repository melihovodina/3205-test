import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUrlDto } from './dtos/createUrl.dto';
import { UrlModel } from './models/url.model';
import * as cuid from 'cuid';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async shortUrl(createUrlDto: CreateUrlDto): Promise<UrlModel> {
    const shortUrl = createUrlDto.alias || cuid();

    const newUrl = await this.prisma.url.create({
      data: {
        originalUrl: createUrlDto.originalUrl,
        shortUrl,
        expiresAt: createUrlDto.expiresAt,
        alias: createUrlDto.alias,
      },
    });

    return newUrl;
  }

  async findUrlByShortUrl(shortUrl: string): Promise<UrlModel> {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      await this.prisma.url.delete({
        where: { shortUrl },
      });
      throw new NotFoundException('URL has expired');
    }

    return url;
  }

  async getUrlInfo(shortUrl: string): Promise<Partial<UrlModel>> {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return {
      id: url.id,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      clickCount: url.clickCount,
    };
  }

  async getAllUrls(): Promise<{id: number, originalUrl: string, shortUrl: string, createdAt: Date}[]> {
    return this.prisma.url.findMany({
      select: {
        id: true,
        originalUrl: true,
        shortUrl: true,
        createdAt: true,
      },
    });
  }

  async deleteUrl(shortUrl: string): Promise<void> {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.prisma.click.deleteMany({
      where: { urlId: url.id },
    });

    await this.prisma.url.delete({
      where: { shortUrl },
    });
  }

  async redirectAndSaveClick(shortUrl: string, ipAddress: string): Promise<string> {
    const url = await this.findUrlByShortUrl(shortUrl);

    await this.prisma.click.create({
      data: {
        urlId: url.id,
        ipAddress,
      },
    });

    await this.prisma.url.update({
      where: { id: url.id },
      data: { clickCount: { increment: 1 } },
    });

    return url.originalUrl;
  }

  async getAnalytics(shortUrl: string): Promise<{ clickCount: number; recentIps: string[] }> {
    const url = await this.findUrlByShortUrl(shortUrl);

    const clicks = await this.prisma.click.findMany({
      where: { urlId: url.id },
      take: 5,
    });

    const recentIps = clicks.map(click => click.ipAddress);

    return {
      clickCount: url.clickCount,
      recentIps,
    };
  }
}