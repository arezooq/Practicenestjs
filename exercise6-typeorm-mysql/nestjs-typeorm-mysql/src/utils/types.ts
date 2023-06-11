import { User } from '../typeorm';

export type CreateUserParams = {
  username: string;
  descriminator: string;
  avatar: string;
  discordId: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};

export type UserDetails = {
  username: string;
  descriminator: string;
  avatar: string;
  discordId: string;
};

export type Done = (err: Error, user: User) => void;
