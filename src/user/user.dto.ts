export class UserDto {
  id: number;
  role: string;
  email: string;
  username: string;
  password: string;
  city: string;
  image?: File;
  date: Date;
}
