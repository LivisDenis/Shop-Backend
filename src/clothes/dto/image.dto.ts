import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty({ example: 1, description: 'Идентификатор изображения' })
  id: number;

  @ApiProperty({ example: 'image.jpg', description: 'Название файла изображения' })
  fileName: string;
}
