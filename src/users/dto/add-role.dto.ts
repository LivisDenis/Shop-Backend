import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    enum: ['ADMIN', 'USER', 'SHOP', 'GOD'],
    description: 'Значение роли'
  })
  readonly value: 'ADMIN' | 'USER' | 'SHOP' | 'GOD';

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  readonly userId: number;
}
