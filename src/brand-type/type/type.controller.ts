import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeDto } from '../dto';

@ApiTags('Типы')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @ApiOperation({ summary: 'Создать тип' })
  @ApiResponse({ status: 201, description: 'Тип успешно создан', type: TypeDto })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createTypeData: Prisma.TypeCreateInput) {
    return this.typeService.create(createTypeData);
  }

  @ApiOperation({ summary: 'Получить список всех типов' })
  @ApiResponse({ status: 200, description: 'Список всех типов', type: [TypeDto] })
  @Get('all')
  findAll() {
    return this.typeService.findAll();
  }

  @ApiOperation({ summary: 'Удалить тип' })
  @ApiResponse({ status: 200, description: 'Тип успешно удален' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove({ id: +id });
  }
}
