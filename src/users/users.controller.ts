import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from '@/src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('create')
  create(@Body() userData: Prisma.UserCreateInput) {
    return this.usersService.create(userData);
  }

  @Get('all')
  findAll(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    }
  ) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() updateUserData: Prisma.UserUpdateInput
  ) {
    return this.usersService.update({ where: id, data: updateUserData });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.deleteUser(id);
  }
}
