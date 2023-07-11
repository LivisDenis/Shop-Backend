import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShopDto, CreateShopDto } from './dto';

@ApiTags('Магазин')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: 'Создать магазин' })
  @ApiResponse({ status: 201, description: 'Магазин успешно создан' })
  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @ApiOperation({ summary: 'Найти все магазины' })
  @ApiResponse({ status: 200, description: 'Список всех магазинов', type: ShopDto, isArray: true })
  @Get('all')
  findAll() {
    return this.shopService.findAll();
  }

  @ApiOperation({ summary: 'Найти магазин по ID' })
  @ApiResponse({ status: 200, description: 'Магазин найден', type: ShopDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne({ id: +id });
  }

  @ApiOperation({ summary: 'Обновить магазин' })
  @ApiResponse({ status: 200, description: 'Магазин успешно обновлен' })
  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopData: Prisma.ShopUpdateInput) {
    return this.shopService.update(+id, updateShopData);
  }

  @ApiOperation({ summary: 'Удалить магазин' })
  @ApiResponse({ status: 200, description: 'Магазин успешно удален' })
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove({ id: +id });
  }
}
