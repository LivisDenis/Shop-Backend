import { Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthModule } from '@/src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PrismaModule } from '@/src/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, RolesModule, PrismaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
