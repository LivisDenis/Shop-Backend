import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { BrandService } from './brand.service';
import {Prisma} from "@prisma/client";
import {Roles} from "@/src/auth/roles-auth.decorator";
import {RolesGuard} from "@/src/auth/guards/roles.guard";
import {JwtAuthGuard} from "@/src/auth/guards/jwt-auth.guard";

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove({id: +id});
  }
}
