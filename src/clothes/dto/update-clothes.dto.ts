import { PartialType } from '@nestjs/swagger';
import { CreateClothesDto } from './create-clothes.dto';

export class UpdateClothesDto extends PartialType(CreateClothesDto) {}
