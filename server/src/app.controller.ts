import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlModel } from './models/url.model';
import { CreateUrlDto } from './dtos/createUrl.dto';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "shortens the received url" })
  @ApiResponse({ status: 201, type: UrlModel})
  @Post('/shorten')
  async shortUrl(@Body() createUrlDto: CreateUrlDto): Promise<UrlModel> {
    try {
      return this.appService.shortUrl(createUrlDto);
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: "Returns information about the shortened URL" })
  @ApiResponse({ status: 200, type: UrlModel, description: 'Returns URL information' })
  @Get('/info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string): Promise<Partial<UrlModel>> {
    try {
      return await this.appService.getUrlInfo(shortUrl);
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: "Returns information about all shortened URLs" })
  @ApiResponse({ status: 200, type: UrlModel, description: 'Returns information about all URLs' })
  @Get('/info')
  async getAllUrls(): Promise<{id: number, originalUrl: string, shortUrl: string, createdAt: Date}[]> {
    try {
      return await this.appService.getAllUrls();
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: "Redirects to the original URL" })
  @ApiResponse({ status: 302, description: 'Redirects to the original URL' })
  @Get('/:shortUrl')
  async redirectUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response, @Req() req: Request): Promise<void> {
    try {
      const originalUrl = await this.appService.redirectAndSaveClick(shortUrl, req.ip || 'unknown');
      res.redirect(originalUrl);
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: "Deletes the shortened URL" })
  @ApiResponse({ status: 200, description: 'URL deleted successfully' })
  @Delete('/delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string): Promise<void>  {
    try {
      await this.appService.deleteUrl(shortUrl)
    } catch (error) {
      throw error
    }
  }

  @ApiOperation({ summary: "Returns analytics for the shortened URL" })
  @ApiResponse({ status: 200, description: 'Returns URL analytics' })
  @Get('/analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string): Promise<{ clickCount: number; recentIps: string[] }> {
    try {
      return await this.appService.getAnalytics(shortUrl);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('URL not found');
      } else {
        throw new Error('Internal server error');
      }
    }
  }
}