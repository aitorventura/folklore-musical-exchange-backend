//import { UserDto } from 'src/user/user.dto';

export class MusicalExchangeDto {
  id: number;
  idMGroupA: number;
  idMGroupB: number;
  place: string;
  description: string;
  repertoire: string;
  neededMoney: number;
  crowdfundingLink: string;
  date: Date; //No sé si el tipo es Date

  /*
    console.log("id: "+musicalexchange.id);
    console.log("idMGroupA: "+musicalexchange.idMGroupA);
    console.log("idMGroupB: "+musicalexchange.idMGroupB);
    console.log("description: "+musicalexchange.description);
    console.log("neededMoney: "+musicalexchange.neededMoney);
    console.log("crowdfundingLink: "+musicalexchange.crowdfundingLink);
    console.log("date: "+musicalexchange.date);
  */
}
