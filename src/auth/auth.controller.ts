import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.login(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  registration(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.registration(userData);
  }
}
