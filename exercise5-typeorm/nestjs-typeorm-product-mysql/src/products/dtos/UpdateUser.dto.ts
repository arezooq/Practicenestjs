export class UpdateUserDto {
  username: string;
  password: string;
  role: 'Admin' | 'User';
}
