import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from '@/src/roles/roles.service';
import { PrismaModule } from '@/src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
