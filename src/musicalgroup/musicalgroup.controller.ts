import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { MusicalGroupDto } from '../musicalgroup/musicalgroup.dto';
import { MusicalGroupService } from '../musicalgroup/musicalgroup.service';

@Controller('musicalgroup')
export class MusicalGroupController {
  constructor(private readonly musicalgroupService: MusicalGroupService) {}
  @Get()
  getMusicalGroup() {
    //TODO: ver como recoge la lista de grupos y acabar
    return this.musicalgroupService.getMusicalGroup();
  }

  @Post('/create')
  async createMusicalGroup(@Body() musicalgroupDto: MusicalGroupDto) {
    return this.musicalgroupService.createMusicalGroup(musicalgroupDto);
  }

  @Delete() //TODO: acabar
  async deleteMusicalGroup(@Body() musicalgroupId: number) {
    return this.musicalgroupService.deleteMusicalGroup(musicalgroupId);
  }
}
