import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { Clothes, Prisma } from '@prisma/client';
import { FilesService } from '@/src/files/files.service';

@Injectable()
export class ClothesService {
  constructor(private prisma: PrismaService, private fileService: FilesService) {}

  async create(createClothesData: Prisma.ClothesCreateInput, images): Promise<Clothes> {
    const fileNames = await Promise.all(images.map((image) => this.fileService.createFile(image)));

    const clothes = await this.prisma.clothes.create({
      data: {
        ...createClothesData,
        image: {
          create: fileNames.map((fileName) => ({ fileName }))
        }
      },
      include: {
        image: true
      }
    });

    return clothes;
  }

  async findAll(): Promise<Clothes[]> {
    return this.prisma.clothes.findMany();
  }

  async findOne(uniqueInput: Prisma.ClothesWhereUniqueInput): Promise<Clothes> {
    return this.prisma.clothes.findUnique({ where: uniqueInput, include: { image: true } });
  }

  async update(
    uniqueInput: Prisma.ClothesWhereUniqueInput,
    updateClothesData: Prisma.ClothesUpdateInput
  ): Promise<Clothes> {
    return this.prisma.clothes.update({ where: uniqueInput, data: updateClothesData });
  }

  async remove(uniqueInput: Prisma.ClothesWhereUniqueInput): Promise<Clothes> {
    return this.prisma.clothes.delete({ where: uniqueInput });
  }
}
