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
import { MusicalGroupDto } from 'src/musicalgroup/musicalgroup.dto';

@Controller('subscriptionMG')
export class SubscriptionMGController {
  constructor(private readonly subscriptionMGService: SubscriptionMGService) { }

  @Get(':idPerson/:idMGroup/check')
  async isSubscribed(
    @Param('idPerson') idPerson: number,
    @Param('idMGroup') idMGroup: number) {
    return await this.subscriptionMGService.isSubscribed(idPerson, idMGroup);
  }

  @Get(':idPerson')
  async getSubscriptionsMG(@Param('idPerson') idPerson: number) {
    return await this.subscriptionMGService.getSubscriptionsMG(idPerson);
  }

  @Post('/create')
  async createSubscription(@Body() subscriptionMGDto: SubscriptionMGDto) {
    return await this.subscriptionMGService.createSubscriptionMG(subscriptionMGDto);
  }

  @Delete(':idPerson/:idMGroup')
  async deleteSubscription(
    @Param('idPerson') idPerson: number,
    @Param('idMGroup') idMGroup: number,
  ) {
    return await this.subscriptionMGService.deleteSubscriptionMG(idPerson, idMGroup);
  }
}
