import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { MusicalExchangeDto } from '../musicalexchange/musicalexchange.dto';
import { MusicalExchangeService } from '../musicalexchange/musicalexchange.service';
import { AuthGuard } from '../guards/auth.guard';
import { Requester } from '../shared/entities/requester';
import { AuthUser } from '../shared/decorators/requester.decorator';
import { MusicalExchangeDataBaseConnection } from './musicalexchange.database';
import { RequesterRole } from '../shared/enums/requester-role.enum';

@Controller('musicalexchange')
export class MusicalExchangeController {
  constructor(
    private readonly musicalexchangeService: MusicalExchangeService,
  ) {}

  @Get()
  async getMusicalExchanges() {
    return await this.musicalexchangeService.getMusicalExchanges();
  }

  @Get(':id')
  async getMusicalExchange(@Param('id') id: number) {
    const result = await this.musicalexchangeService.getMusicalExchange(id);
    return result[0];
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createMusicalExchange(@AuthUser() requester: Requester, @Body() musicalexchangeDto: MusicalExchangeDto) {
    if(requester.role !== RequesterRole.MGROUP){
      throw new ForbiddenException();
    }
    return this.musicalexchangeService.createMusicalExchange(
      musicalexchangeDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteMusicalExchange(@AuthUser() requester: Requester, @Param('id') id: string) {
    if(requester.role !== RequesterRole.MGROUP){
      throw new ForbiddenException();
    }

    const listExchanges = await new MusicalExchangeDataBaseConnection().getMusicalExchangeMGroup(requester.id);
      const array =  []
      listExchanges.forEach(element => {
          array.push(element.id)
      })

      if(!array.includes(parseInt(id))){
        throw new ForbiddenException();
      }


    return this.musicalexchangeService.deleteMusicalExchange(parseInt(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateMusicalExchange(@AuthUser() requester: Requester,
    @Param('id') id: string,
    @Body() musicalExchangeDto: MusicalExchangeDto,
  ) {
    if(requester.role !== "MGROUP"){
      throw new ForbiddenException();
    }

    const listExchanges = await new MusicalExchangeDataBaseConnection().getMusicalExchangeMGroup(requester.id);
      const array =  []
      listExchanges.forEach(element => {
          array.push(element.id)
      })

      if(!array.includes(parseInt(id))){
        throw new ForbiddenException();
      }

    musicalExchangeDto.id = parseInt(id);
    return this.musicalexchangeService.updateMusicalExchange(
      musicalExchangeDto,
    );
  }
}
