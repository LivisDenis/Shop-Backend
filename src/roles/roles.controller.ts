import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService, RoleValues } from '@/src/roles/roles.service';
import { Prisma, Role } from '@prisma/client';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() roleData: Prisma.RoleCreateInput): Promise<Role> {
    return this.rolesService.createRole(roleData);
  }

  @Get(':value')
  getByValue(@Param('value') roleValue: RoleValues): Promise<Role> {
    return this.rolesService.getRoleByValue(roleValue);
  }
}
