//import { UserDto } from 'src/user/user.dto';

export class MusicalExchangeDto {
  // extends UserDto {
  id: number; //Se tiene que poner?
  idMGroupA: number;
  idMGroupB: number;
  date: Date; //No sé si el tipo es Date
  place: string;
  description: string;
  repertoire: string;
  neededMoney: number;
  crowdfundingLink: string;
}
