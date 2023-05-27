import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService, RoleValues } from '@/src/roles/roles.service';
import { Prisma, Role } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() roleData: Prisma.RoleCreateInput): Promise<Role> {
    return this.rolesService.createRole(roleData);
  }

  @Get(':value')
  getByValue(@Param('value') roleValue: RoleValues): Promise<Role> {
    return this.rolesService.getRoleByValue(roleValue);
  }
}
