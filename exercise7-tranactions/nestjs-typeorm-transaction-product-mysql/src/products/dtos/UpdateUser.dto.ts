export enum UserTypeEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export class UpdateUserDto {
  username: string;
  password: string;
  role: UserTypeEnum;
}
