export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export class CreateUserDto {
  username: string;
  password: string;
  role: UserTypeEnum;
}
