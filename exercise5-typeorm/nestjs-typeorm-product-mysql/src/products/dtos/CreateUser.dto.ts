export class CreateUserDto {
  username: string;
  password: string;
  role: 'Admin' | 'User';
}
