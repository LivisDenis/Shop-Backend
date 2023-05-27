import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Type, Prisma } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandData: Prisma.TypeCreateInput): Promise<Type> {
    return this.prisma.type.create({ data: createBrandData });
  }

  async findAll(): Promise<Type[]> {
    return this.prisma.type.findMany();
  }

  async remove(uniqueInput: Prisma.TypeWhereUniqueInput): Promise<Type> {
    return this.prisma.type.delete({ where: uniqueInput });
  }
}
