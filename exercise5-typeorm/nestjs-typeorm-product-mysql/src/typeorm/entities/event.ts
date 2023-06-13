import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import { Product } from './Product';
import { IsOptional } from '@nestjs/class-validator';

export enum EventTypeEnum {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
}

@Entity({ name: 'events' })
export class Event {
  constructor(input: Partial<Event>) {
    Object.assign(this, input);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: EventTypeEnum;

  @CreateDateColumn()
  @IsOptional()
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @ManyToOne(() => Product, (product) => product.events)
  product: Product;
}
