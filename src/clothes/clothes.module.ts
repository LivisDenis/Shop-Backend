import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { FilesModule } from '@/src/files/files.module';
import { AuthModule } from '@/src/auth/auth.module';

@Module({
  imports: [PrismaModule, FilesModule, AuthModule],
  controllers: [ClothesController],
  providers: [ClothesService]
})
export class ClothesModule {}
