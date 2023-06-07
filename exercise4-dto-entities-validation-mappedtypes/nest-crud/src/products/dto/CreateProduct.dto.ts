import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  id: string;

  @IsNotEmpty({ message: 'The product should have a title' })
  @Length(3, 255)
  @IsString()
  title: string;

  @IsNotEmpty()
  @Length(3)
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'The product should have a price' })
  @IsNumber()
  price: number;
}
