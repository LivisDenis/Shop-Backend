import { ApiProperty } from '@nestjs/swagger';

export class BrandDto {
  @ApiProperty({ example: 1, description: 'Идентификатор бренда' })
  id: number;

  @ApiProperty({ example: 'GUCCI', description: 'Название бренда' })
  name: string;
}
