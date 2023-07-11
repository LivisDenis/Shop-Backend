import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from '@/src/roles/roles.service';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { RoleValues } from '@/src/roles/types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, RoleDto } from './dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана', type: RoleDto })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() roleDto: CreateRoleDto): Promise<RoleDto> {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получить роль' })
  @ApiResponse({ status: 200, description: 'Роль найдена', type: RoleDto })
  @Get(':value')
  getByValue(@Param('value') roleValue: RoleValues): Promise<RoleDto> {
    return this.rolesService.getRoleByValue(roleValue);
  }
}
