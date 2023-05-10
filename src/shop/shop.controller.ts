import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopData: Prisma.ShopUpdateInput) {
    return this.shopService.update(+id, updateShopData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove({ id: +id });
  }
}
