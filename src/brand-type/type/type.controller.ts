import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TypeService } from './type.service';
import {Prisma} from "@prisma/client";

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('create')
  create(@Body() createTypeData: Prisma.TypeCreateInput) {
    return this.typeService.create(createTypeData);
  }

  @Get('all')
  findAll() {
    return this.typeService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove({id: +id});
  }
}
