import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsOptional } from '@nestjs/class-validator';
import User from './User';
import { Cart } from './Cart';
import { Event } from './event';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  decription: string;

  @Column()
  price: number;

  @Column({ default: false })
  published: boolean;

  @Column({
    default: 0,
  })
  @IsOptional()
  likeCount?: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;

  @OneToMany(() => Event, (event) => event.product)
  events: Event[];
}
