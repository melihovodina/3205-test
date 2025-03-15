import { Body, Controller, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
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
      res.status(500).send('Internal server error');
    }
  }
}