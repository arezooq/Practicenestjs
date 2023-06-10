export type CreateUserParams = {
  username: string;
  password: string;
  role: 'Admin' | 'User';
};

export type UpdateUserParams = {
  username: string;
  password: string;
  role: 'Admin' | 'User';
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
