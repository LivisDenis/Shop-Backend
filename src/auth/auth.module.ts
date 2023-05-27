import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthService } from '@/src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/src/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '@/src/auth/session.serializer';
import { LocalStrategy } from '@/src/auth/common/strategies/local.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    PassportModule.register({ session: true })
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
