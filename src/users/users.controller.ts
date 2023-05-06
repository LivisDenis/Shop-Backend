import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from '@/src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() updateUserData: Prisma.UserUpdateInput
  ) {
    return this.usersService.update({ where: { id: +id }, data: updateUserData });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.deleteUser({ id: +id });
  }
}
