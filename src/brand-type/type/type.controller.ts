import {Controller, Get, Post, Body, Param, Delete, UseGuards} from '@nestjs/common';
import { TypeService } from './type.service';
import {Prisma} from "@prisma/client";
import {Roles} from "@/src/auth/roles-auth.decorator";
import {RolesGuard} from "@/src/auth/guards/roles.guard";
import {JwtAuthGuard} from "@/src/auth/guards/jwt-auth.guard";

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove({id: +id});
  }
}
