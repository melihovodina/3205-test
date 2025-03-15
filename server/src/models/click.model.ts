import { Click } from "@prisma/client";
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ClickModel implements Click {
  @ApiProperty({example: '1', description: 'click id'})
  id: number;

  @ApiProperty({example: '1', description: 'url id'})
  @IsInt()
  urlId: number;

  @ApiProperty({example: '', description: 'click date'})
  clickedAt: Date;

  @ApiProperty({example: '127.0.0.1', description: 'user ip adress that did click'})
  @IsString()
  ipAddress: string;
}