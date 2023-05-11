import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BrandService } from './brand.service';
import {Prisma} from "@prisma/client";

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  create(@Body() createBrandData: Prisma.BrandCreateInput) {
    return this.brandService.create(createBrandData);
  }

  @Get('all')
  findAll() {
    return this.brandService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove({id: +id});
  }
}
