import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';
import { Post } from './Post';

@Entity({ name: 'users' })
export default class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  descriminator: string;

  @Column()
  avatar: string;

  @Column({ name: 'discord_name', unique: true })
  discordId: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post;
}

export interface IUser {
  username: string;
  descriminator: string;
  avatar: string;
  discordId: string;
}
