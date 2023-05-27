import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Prisma } from '@prisma/client';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  create(@Body() createBrandData: Prisma.BrandCreateInput) {
    return this.brandService.create(createBrandData);
  }

  @Get('all')
  findAll() {
    return this.brandService.findAll();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove({ id: +id });
  }
}
