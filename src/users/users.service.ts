import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { RolesService } from '@/src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private roles: RolesService) {}

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const role = await this.roles.getRoleByValue('USER');
    const user = await this.prisma.user.create({
      data: { ...userData, role: { connect: [{ value: role.value }] } },
      include: { role: true }
    });

    return user;
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { role: true }
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    });
  }
}
