import { Injectable } from '@nestjs/common';
import {PrismaService} from "@/src/prisma/prisma.service";
import {Brand, Prisma} from "@prisma/client";

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandData: Prisma.BrandCreateInput): Promise<Brand> {
    return this.prisma.brand.create({data: createBrandData})
  }

  async findAll(): Promise<Brand[]> {
    return this.prisma.brand.findMany()
  }

  async remove(uniqueInput: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    return this.prisma.brand.delete({where: uniqueInput})
  }
}
