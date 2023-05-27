import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createTypeData: Prisma.TypeCreateInput) {
    return this.typeService.create(createTypeData);
  }

  @Get('all')
  findAll() {
    return this.typeService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove({ id: +id });
  }
}
