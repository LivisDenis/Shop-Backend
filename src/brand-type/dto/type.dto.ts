import { ApiProperty } from '@nestjs/swagger';

export class TypeDto {
  @ApiProperty({ example: 1, description: 'Идентификатор типа' })
  id: number;

  @ApiProperty({ example: 'Обувь', description: 'Название типа' })
  name: string;
}
