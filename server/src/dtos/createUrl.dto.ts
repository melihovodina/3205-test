import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinDate } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({ example: 'https://youtube.com', description: 'original url' })
  @IsUrl()
  originalUrl: string;

  @ApiProperty({ example: '2023-12-31T23:59:59Z', description: 'url expiration date', required: false })
  @IsOptional()
  expiresAt?: Date | null;

  @ApiProperty({ example: 'myalias', description: 'url alias', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  alias?: string | null;
}