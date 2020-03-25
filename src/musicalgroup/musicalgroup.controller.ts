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

@Controller('musicalgroup')
export class MusicalGroupController {
  constructor(private readonly musicalgroupService: MusicalGroupService) {}

  @Get() //FIXME: no pilla los datos, algo está mal enrutado.. meh
  async getMusicalGroups() {
    //TODO: ver como recoge la lista de grupos y acabar
    return await this.musicalgroupService.getMusicalGroups();
  }

  @Get(':id')
  async getMusicalGroup(@Param('id') id: number) {
    const result = await this.musicalgroupService.getMusicalGroup(id);
    return result[0];
  }

  @Post('/create') //sí que va
  async createMusicalGroup(@Body() musicalgroupDto: MusicalGroupDto) {
    return this.musicalgroupService.createMusicalGroup(musicalgroupDto);
  }

  @Delete(':id') //TODO: acabar, se necesita pasarle id
  async deleteMusicalGroup(@Param('id') id: number) {
    console.log('Backend: ' + id);
    return this.musicalgroupService.deleteMusicalGroup(id);
  }

  @Put(':id')
  async updateMusicalGroup(
    @Param('id') id: number,
    @Body() musicalGroupDto: MusicalGroupDto,
  ) {
    musicalGroupDto.id = id;
    return this.musicalgroupService.updateMusicalGroup(musicalGroupDto);
  }
}
