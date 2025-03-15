import { ApiProperty } from "@nestjs/swagger";
import { Click, Url } from "@prisma/client";
import { IsOptional, IsString, IsUrl, IsInt } from 'class-validator';
import { ClickModel } from "./click.model";

export class UrlModel implements Url {
  @ApiProperty({example: 1, description: 'url id'})
  id: number;

  @ApiProperty({example: 'https://youtube.com', description: 'original url'})
  @IsUrl()
  originalUrl: string;

  @ApiProperty({example: 'cm8a1u1hn00002sujfkqk5env', description: 'shortened url'})
  @IsString()
  shortUrl: string;

  @ApiProperty({example: '2023-12-31T23:59:59Z', description: 'url expiration date'})
  @IsOptional()
  expiresAt: Date | null;

  @ApiProperty({example: 'myalias', description: 'url alias'})
  @IsOptional()
  @IsString()
  alias: string | null;

  @ApiProperty({example: '2023-12-31T23:59:59Z', description: 'url creation date'})
  createdAt: Date;

  @ApiProperty({example: '123', description: 'number of clicks on url'})
  @IsInt()
  clickCount: number;

  @ApiProperty({ type: [ClickModel], description: 'List of clicks associated with this URL' })
  clicks?: Click[];
}