import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { MusicalGroupDto } from '../musicalgroup/musicalgroup.dto';
import { MusicalGroupService } from '../musicalgroup/musicalgroup.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('musicalgroup')
export class MusicalGroupController {
  constructor(private readonly musicalgroupService: MusicalGroupService) {}

  @Get() //FIXME: no pilla los datos, algo está mal enrutado.. meh
  getMusicalGroups() {
    //TODO: ver como recoge la lista de grupos y acabar
    return this.musicalgroupService.getMusicalGroups();
  }

  @Post('/create') //sí que va
  async createMusicalGroup(@Body() musicalgroupDto: MusicalGroupDto) {
    return this.musicalgroupService.createMusicalGroup(musicalgroupDto);
  }

  @Delete(':id') //TODO: acabar, se necesita pasarle id
  async deleteMusicalGroup(@Param('id') id: number) {
    return this.musicalgroupService.deleteMusicalGroup(id);
  }

  @Put() //TODO: acabar, se necesita id
  async setMusicalGroup(@Body() musicalgroupDto: MusicalGroupDto) {
    return this.musicalgroupService.setMusicalGroup(musicalgroupDto);
  }
}
