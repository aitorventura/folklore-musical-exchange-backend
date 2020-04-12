import { UserDto } from 'src/user/user.dto';

export class SubscriptionDto extends UserDto {
  idPerson: number;
  nameType: string;
}
