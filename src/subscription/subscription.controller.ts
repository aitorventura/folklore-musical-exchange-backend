import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Delete,
  Param,
} from '@nestjs/common';
import { SubscriptionDto } from '../subscription/subscription.dto';
import { SubscriptionService } from '../subscription/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':id')
  async getSubscriptions(@Param('id') id: number) {
    const result = await this.subscriptionService.getSubscriptions(id);
    return result[0];
  }

  @Post('/create')
  async createSubscription(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionService.createSubscription(subscriptionDto);
  }

  // Por ahora no será necesario, la persona o se subscribe o no
  /*@Put(':id')
  async updateSubscription(@Param('id') id: number, @Body() subscriptionDto: SubscriptionDto) {
    console.log('Hago update desde el frontend');
    subscriptionDto.id = id;
    return this.subscriptionService.updateSubscription(subscriptionDto);
  }*/

  @Delete(':id/:nameType')
  async deleteSubscription(
    @Param('id') id: number,
    @Param('nameType') nameType: string,
  ) {
    return this.subscriptionService.deleteSubscription(id, nameType);
  }
}
