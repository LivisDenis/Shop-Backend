import { ApiProperty } from '@nestjs/swagger';
import { ImageDto, ClothesInfoDto } from './index';

export class ClothesDto {
  @ApiProperty({ example: 1, description: 'Идентификатор одежды' })
  id: number;

  @ApiProperty({ example: 'Название одежды', description: 'Название одежды' })
  name: string;

  @ApiProperty({ example: 'Цена одежды', description: 'Цена одежды' })
  price: string;

  @ApiProperty({ type: () => [ImageDto], description: 'Изображения одежды' })
  image: ImageDto[];

  @ApiProperty({ type: () => [ClothesInfoDto], description: 'Информация об одежде' })
  clothesInfo: ClothesInfoDto[];
}
