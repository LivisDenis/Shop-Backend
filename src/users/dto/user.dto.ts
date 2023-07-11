import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  email: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Фамилия пользователя' })
  surname: string;
}
