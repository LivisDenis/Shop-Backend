import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { User, Role, Prisma } from '@prisma/client';
import { RolesService } from '@/src/roles/roles.service';
import { AddRoleDto } from '@/src/users/dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private roles: RolesService) {}

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const role = await this.roles.getRoleByValue('USER');
    const user = await this.prisma.user.create({
      data: { ...userData, roles: { connect: [{ value: role.value }] } },
      include: { roles: true }
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { roles: true }
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<(User & { roles: Role[] }) | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { roles: true }
    });
  }

  async update(userUniqueInput: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      data,
      where: userUniqueInput
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    });
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.findOne({ id: dto.userId });
    const role = await this.roles.getRoleByValue(dto.value);

    if (user && role) {
      await this.update({id: dto.userId}, {roles: {connect: [{value: role.value}]}});
      return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }
}
