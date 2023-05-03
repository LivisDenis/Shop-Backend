import { Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthService } from '@/src/auth/auth.service';
import { LocalStrategy } from '@/src/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: { expiresIn: configService.get('EXPIRES_IN') }
        };
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtService]
})
export class AuthModule {}
