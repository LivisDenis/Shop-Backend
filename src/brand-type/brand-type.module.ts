import { Module } from '@nestjs/common';
import { AuthModule } from '@/src/auth/auth.module';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { BrandController } from '@/src/brand-type/brand/brand.controller';
import { TypeController } from '@/src/brand-type/type/type.controller';
import { BrandService } from '@/src/brand-type/brand/brand.service';
import { TypeService } from '@/src/brand-type/type/type.service';
import { UsersModule } from '@/src/users/users.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [BrandController, TypeController],
  providers: [BrandService, TypeService],
  exports: [BrandService, TypeService]
})
export class BrandTypeModule {}
