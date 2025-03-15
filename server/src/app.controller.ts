import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlModel } from './models/url.model';
import { CreateUrlDto } from './dtos/createUrl.dto';
import { Response } from 'express';

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

  @ApiOperation({ summary: "Redirects to the original URL" })
  @ApiResponse({ status: 302, description: 'Redirects to the original URL' })
  @Get('/:shortUrl')
  async redirectUrl(@Param('shortUrl') shortUrl: string, @Res() res: Response): Promise<void> {
    try {
      const url = await this.appService.findUrlByShortUrl(shortUrl);
      res.redirect(url.originalUrl)
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
}