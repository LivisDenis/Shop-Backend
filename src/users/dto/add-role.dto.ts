export class AddRoleDto {
  readonly value: 'ADMIN' | 'USER' | 'SHOP';
  readonly userId: number;
}
