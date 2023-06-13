export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type CreateUserParams = {
  username: string;
  password: string;
  role: UserTypeEnum;
};

export type UpdateUserParams = {
  username: string;
  password: string;
  role: UserTypeEnum;
};

export type CreateUserProductParams = {
  title: string;
  description: string;
  price: number;
  published: boolean;
};

export type UpdateUserProductParams = {
  title: string;
  description: string;
  price: number;
  published: boolean;
};

export type CreateUserCartParams = {
  totalPrice: number;
  status: boolean;
};

export type UpdateUserCartParams = {
  totalPrice: number;
  status: boolean;
};

export type CreateUserEventLikeParams = {
  productId: string;
  userId: number;
};
