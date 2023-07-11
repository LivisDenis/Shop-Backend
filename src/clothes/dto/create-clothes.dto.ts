import { OmitType } from '@nestjs/swagger';
import { ClothesDto } from './clothes.dto';

export class CreateClothesDto extends OmitType(ClothesDto, ['id']) {}
