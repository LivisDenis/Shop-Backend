import { Module } from '@nestjs/common';
import { UsersModule } from '@/src/users/users.module';
import { AuthModule } from '@/src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { ShopModule } from './shop/shop.module';
import { FilesModule } from './files/files.module';
import { ClothesModule } from './clothes/clothes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BrandTypeModule } from './brand-type/brand-type.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    RolesModule,
    PrismaModule,
    ShopModule,
    FilesModule,
    ClothesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    BrandTypeModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
