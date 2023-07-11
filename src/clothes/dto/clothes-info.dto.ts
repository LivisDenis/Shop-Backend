import { ApiProperty } from '@nestjs/swagger';

export class ClothesInfoDto {
  @ApiProperty({ example: 1, description: 'Идентификатор информации об одежде' })
  id: number;

  @ApiProperty({ example: 'Описание одежды', description: 'Описание одежды' })
  description: string;

  @ApiProperty({ example: 41, description: 'Размер одежды' })
  size: number;

  @ApiProperty({ example: 'Цвет одежды', description: 'Цвет одежды' })
  color: string;

  @ApiProperty({ example: 'Производитель одежды', description: 'Производитель одежды' })
  manufacturer: string;

  @ApiProperty({ example: 'Артикул одежды', description: 'Артикул одежды' })
  sku: string;
}
