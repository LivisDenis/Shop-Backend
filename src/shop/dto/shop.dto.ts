import { ApiProperty } from '@nestjs/swagger';

export class ShopDto {
  @ApiProperty({ example: 1, description: 'Идентификатор магазина' })
  id: number;

  @ApiProperty({ example: 'Магазин одежды', description: 'Название магазина' })
  title: string;

  @ApiProperty({ example: 'Описание магазина', description: 'Описание магазина' })
  description: string;

  @ApiProperty({ example: 'image.jpg', description: 'Изображение магазина' })
  image: string;
}
