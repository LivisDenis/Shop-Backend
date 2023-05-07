import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService, RoleValues } from '@/src/roles/roles.service';
import { Prisma, Role } from '@prisma/client';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('create')
  create(@Body() roleData: Prisma.RoleCreateInput): Promise<Role> {
    return this.rolesService.createRole(roleData);
  }

  @Get(':value')
  getByValue(@Param('value') roleValue: RoleValues): Promise<Role> {
    return this.rolesService.getRoleByValue(roleValue);
  }
}
