import { UserDto } from 'src/user/user.dto';

export class MusicalGroupDto extends UserDto {
  name: string;
  description: string;
  members: number;
  nameType: string;
}
