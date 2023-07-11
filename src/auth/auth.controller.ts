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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@/src/auth/common/guards/local.auth.guard';
import { UsersService } from '@/src/users/users.service';
import { AuthenticatedGuard } from '@/src/auth/common/guards/authenticated.guard';
import { UserDto } from '@/src/users/dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, description: 'Успешно создан новый пользователь', type: UserDto })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Header('Content-type', 'application/json')
  createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.usersService.create(userData);
  }

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешно выполнен вход', type: UserDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { user: req.user, msg: 'Logged in' };
  }

  @ApiOperation({ summary: 'Проверка статуса входа' })
  @ApiResponse({ status: 200, description: 'Пользователь аутентифицирован', type: UserDto })
  @Get('login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, description: 'Сеанс завершен' })
  @Get('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'session has ended' };
  }
}
