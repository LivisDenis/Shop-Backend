import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createShopData: Prisma.ShopCreateInput) {
    return this.shopService.create(createShopData);
  }

  @Get('all')
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne({ id: +id });
  }

  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopData: Prisma.ShopUpdateInput) {
    return this.shopService.update(+id, updateShopData);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove({ id: +id });
  }
}
