import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard';
import {RolesGuard} from "@/src/auth/guards/roles.guard";

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('image'))
  create(@Body() createClotheData: Prisma.ClothesCreateInput, @UploadedFiles() image) {
    return this.clothesService.create(createClotheData, image);
  }

  @Get('all')
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne({ id: +id });
  }

  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotheDto: UpdateClothesDto) {
    return this.clothesService.update({ id: +id }, updateClotheDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.remove({ id: +id });
  }
}
