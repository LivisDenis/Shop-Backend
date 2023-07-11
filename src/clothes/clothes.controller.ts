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
import { Prisma } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { Roles } from '@/src/auth/roles-auth.decorator';
import { RolesGuard } from '@/src/auth/common/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClothesDto } from './dto';

@ApiTags('Одежда')
@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @ApiOperation({ summary: 'Создать одежду' })
  @ApiResponse({ status: 201, description: 'Одежда успешно создана', type: ClothesDto })
  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('image'))
  create(@Body() createClotheData: Prisma.ClothesCreateInput, @UploadedFiles() image) {
    return this.clothesService.create(createClotheData, image);
  }

  @ApiOperation({ summary: 'Получить список всей одежды' })
  @ApiResponse({ status: 200, description: 'Список всей одежды', type: [ClothesDto] })
  @Get('all')
  findAll() {
    return this.clothesService.findAll();
  }

  @ApiOperation({ summary: 'Получить одежду по ID' })
  @ApiResponse({ status: 200, description: 'Одежда найдена', type: ClothesDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne({ id: +id });
  }

  @ApiOperation({ summary: 'Обновить параметры одежды' })
  @ApiResponse({ status: 200, description: 'Одежда успешно обновлена' })
  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotheDto: Prisma.ClothesUpdateInput) {
    return this.clothesService.update({ id: +id }, updateClotheDto);
  }

  @ApiOperation({ summary: 'Удалить одежду' })
  @ApiResponse({ status: 200, description: 'Одежда успешно удалена' })
  @Roles('SHOP')
  @UseGuards(RolesGuard)
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.remove({ id: +id });
  }
}
