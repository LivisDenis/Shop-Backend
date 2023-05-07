import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthService } from '@/src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/src/auth/auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
