import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from './enums/role.enum';
import { Product } from 'src/products/products.model';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product[];
}

export const UserSchema = SchemaFactory.createForClass(User);
