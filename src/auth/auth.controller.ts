import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Header,
  Get
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@/src/auth/common/guards/local.auth.guard';
import { UsersService } from '@/src/users/users.service';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Header('Content-type', 'application/json')
  createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.usersService.create(userData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { user: req.user, msg: 'Logged in' };
  }

  @Get('login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'session has ended' };
  }
}
