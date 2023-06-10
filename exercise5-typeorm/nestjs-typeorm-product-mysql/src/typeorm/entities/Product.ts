import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './User';
import { Cart } from './Cart';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  decription: string;

  @Column()
  price: number;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
