import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { AuthModule } from '@/src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
