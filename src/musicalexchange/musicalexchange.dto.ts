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
  date: Date;
  visualDate = this.date.toLocaleString();
  imageA?: string;
  imageB?: string;

  async getVisualDate() {
    return this.date.toLocaleString();
  }
}
