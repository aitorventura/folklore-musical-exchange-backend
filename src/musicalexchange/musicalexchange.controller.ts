import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { MusicalExchangeDto } from '../musicalexchange/musicalexchange.dto';
import { MusicalExchangeService } from '../musicalexchange/musicalexchange.service';

@Controller('musicalexchange')
export class MusicalExchangeController {
  constructor(
    private readonly musicalexchangeService: MusicalExchangeService,
  ) {}

  @Get()
  async getMusicalExchanges() {
    console.log('getMusicalExchanges BE');
    return await this.musicalexchangeService.getMusicalExchanges();
  }

  @Get(':id')
  async getMusicalExchange(@Param('id') id: number) {
    const result = await this.musicalexchangeService.getMusicalExchange(id);
    return result[0];
  }

  @Post('/create')
  async createMusicalExchange(@Body() musicalexchangeDto: MusicalExchangeDto) {
    return this.musicalexchangeService.createMusicalExchange(
      musicalexchangeDto,
    );
  }

  @Delete(':id')
  async deleteMusicalExchange(@Param('id') id: number) {
    return this.musicalexchangeService.deleteMusicalExchange(id);
  }

  @Put(':id')
  async updateMusicalExchange(
    @Param('id') id: number,
    @Body() musicalExchangeDto: MusicalExchangeDto,
  ) {
    musicalExchangeDto.id = id;
    return this.musicalexchangeService.updateMusicalExchange(
      musicalExchangeDto,
    );
  }
}
