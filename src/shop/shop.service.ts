import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Shop, Prisma } from '@prisma/client';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async create(createShopData: Prisma.ShopCreateInput): Promise<Shop> {
    const shop = await this.prisma.shop.create({ data: createShopData });
    return shop;
  }

  async findAll(): Promise<Shop[]> {
    const shop = await this.prisma.shop.findMany();
    return shop;
  }

  async findOne(shopUniqueInput: Prisma.ShopWhereUniqueInput): Promise<Shop> {
    const shop = await this.prisma.shop.findUnique({ where: shopUniqueInput });
    return shop;
  }

  async update(id: number, updateShopData: Prisma.ShopUpdateInput): Promise<Shop> {
    const shop = await this.prisma.shop.update({ where: { id }, data: updateShopData });
    return shop;
  }

  async remove(removeShopData: Prisma.ShopWhereUniqueInput): Promise<Shop> {
    const shop = await this.prisma.shop.delete({ where: removeShopData });
    return shop;
  }
}
