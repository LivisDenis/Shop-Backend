import { OmitType } from '@nestjs/swagger';
import { ShopDto } from './shop.dto';

export class CreateShopDto extends OmitType(ShopDto, ['id']) {}
