import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({ example: 'https://youtube.com', description: 'original url' })
  @IsUrl()
  originalUrl: string;

  @ApiProperty({ example: '', description: 'url expiration date', required: false })
  @IsOptional()
  expiresAt?: Date | null;

  @ApiProperty({ example: 'myalias', description: 'url alias', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  alias?: string | null;
}