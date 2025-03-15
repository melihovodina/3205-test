import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrlModel } from './models/url.model';
import { CreateUrlDto } from './dtos/createUrl.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "shortens the received url" })
  @ApiResponse({ status: 201, type: UrlModel})
  @Post('/shorten')
  async shortUrl(@Body() createUrlDto: CreateUrlDto): Promise<UrlModel> {
    return this.appService.shortUrl(createUrlDto);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
