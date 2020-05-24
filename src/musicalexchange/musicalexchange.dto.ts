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
  nombreMA: string;
  nombreMB: string;
  date: Date; //No sé si el tipo es Date
  visualDate = this.date.toLocaleString();
  imageA?: string;
  imageB?: string;

  async getVisualDate() {
    console.log('Fecha visual: ' + this.date.toLocaleString());
    return this.date.toLocaleString();
  }

  async dame() {
    console.log('id: ' + this.id);
    console.log('idMGroupA: ' + this.idMGroupA);
    console.log('idMGroupB: ' + this.idMGroupB);
    console.log('description: ' + this.description);
    console.log('neededMoney: ' + this.neededMoney);
    console.log('crowdfundingLink: ' + this.crowdfundingLink);
    console.log('date: ' + this.date);
  }

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
