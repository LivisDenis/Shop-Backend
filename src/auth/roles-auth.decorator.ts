import { SetMetadata } from '@nestjs/common';
import { RoleValues } from '@/src/roles/types';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleValues[]) => SetMetadata(ROLES_KEY, roles);
