import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { Cart } from './Cart';
import { Event } from './event';

export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserTypeEnum;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
}
