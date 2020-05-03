import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { SubscriptionMGDto } from '../subscriptionMG/subscriptionMG.dto';
import { SubscriptionMGService } from '../subscriptionMG/subscriptionMG.service';

@Controller('subscriptionMG')
export class SubscriptionMGController {
  constructor(private readonly subscriptionMGService: SubscriptionMGService) { }

  @Get(':idPerson/:idMGroup/check')
  async isSubscribed(
    @Param('idPerson') idPerson: number,
    @Param('idMGroup') idMGroup: number) {

    return this.subscriptionMGService.isSubscribed(idPerson, idMGroup);
  }

  @Post('/create')
  async createSubscription(@Body() subscriptionMGDto: SubscriptionMGDto) {
    return this.subscriptionMGService.createSubscriptionMG(subscriptionMGDto);
  }

  @Delete(':idPerson/:idMGroup')
  async deleteSubscription(
    @Param('idPerson') idPerson: number,
    @Param('idMGroup') idMGroup: number,
  ) {
    return this.subscriptionMGService.deleteSubscriptionMG(idPerson, idMGroup);
  }
}
