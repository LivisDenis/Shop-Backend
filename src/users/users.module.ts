import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '@/src/users/users.service';
import { UsersController } from '@/src/users/users.controller';
import { AuthModule } from '@/src/auth/auth.module';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { RolesModule } from '@/src/roles/roles.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
