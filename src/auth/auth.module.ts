import { Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthService } from '@/src/auth/auth.service';
import { LocalStrategy } from '@/src/auth/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '@/src/auth/auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
