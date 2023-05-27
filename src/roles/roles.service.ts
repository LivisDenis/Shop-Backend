import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { RoleValues } from '@/src/roles/types';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(roleData: Prisma.RoleCreateInput): Promise<Role> {
    const role = this.prisma.role.create({ data: roleData });
    return role;
  }

  async getRoleByValue(roleValue: RoleValues): Promise<Role> {
    const role = this.prisma.role.findFirst({ where: { value: roleValue.toUpperCase() } });
    return role;
  }
}
