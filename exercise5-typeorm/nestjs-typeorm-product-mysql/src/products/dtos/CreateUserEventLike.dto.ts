import { IsNumber, IsString } from '@nestjs/class-validator';
import { PickType } from '@nestjs/mapped-types';

export class CreateUserEventLike extends PickType(Event, ['type'] as const) {
  @IsString()
  productId: string;

  @IsNumber()
  userId: number;
}
