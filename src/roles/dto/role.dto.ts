import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 1, description: 'Идентификатор роли' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Значение роли' })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  description: string;
}
