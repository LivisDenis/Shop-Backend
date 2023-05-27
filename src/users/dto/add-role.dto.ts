export class AddRoleDto {
  readonly value: 'ADMIN' | 'USER' | 'SHOP' | 'GOD';
  readonly userId: number;
}
