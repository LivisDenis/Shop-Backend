import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from '@/src/users/users.service';
import { AddRoleDto } from '@/src/users/dto/add-role.dto';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserData: Prisma.UserUpdateInput) {
    return this.usersService.update({ id: +id }, updateUserData);
  }

  @Roles('GOD')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser({ id: +id });
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
