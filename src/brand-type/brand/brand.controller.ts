import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandDto } from '../dto';

@ApiTags('Бренды')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({ summary: 'Создать бренд' })
  @ApiResponse({ status: 201, description: 'Бренд успешно создан', type: BrandDto })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createBrandData: Prisma.BrandCreateInput) {
    return this.brandService.create(createBrandData);
  }

  @ApiOperation({ summary: 'Получить список всех брендов' })
  @ApiResponse({ status: 200, description: 'Список всех брендов', type: [BrandDto] })
  @Get('all')
  findAll() {
    return this.brandService.findAll();
  }

  @ApiOperation({ summary: 'Удалить бренд' })
  @ApiResponse({ status: 200, description: 'Бренд успешно удален' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove({ id: +id });
  }
}
