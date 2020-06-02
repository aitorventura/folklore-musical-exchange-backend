import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { MusicalGroupDto } from '../musicalgroup/musicalgroup.dto';
import { MusicalGroupService } from '../musicalgroup/musicalgroup.service';
import { AuthGuard } from '../guards/auth.guard';
import { AuthUser } from '../shared/decorators/requester.decorator';
import { Requester } from '../shared/entities/requester';
import { RequesterRole } from '../shared/enums/requester-role.enum';

@Controller('musicalgroup')
export class MusicalGroupController {
  constructor(private readonly musicalgroupService: MusicalGroupService) {}

  @Get()
  async getMusicalGroups() {
    return await this.musicalgroupService.getMusicalGroups();
  }

  @Get('/others/:id')
  async getOtherMusicalGroups(@Param('id') id: number) {
    return await this.musicalgroupService.getOthersMusicalGroups(id);
  }

  @Get(':id')
  async getMusicalGroup(@Param('id') id: number) {
    const result = await this.musicalgroupService.getMusicalGroup(id);
    return result[0];
  }

  @Post('/create')
  async createMusicalGroup(@Body() musicalgroupDto: MusicalGroupDto) {
    let res = this.musicalgroupService.createMusicalGroup(musicalgroupDto);
    return res;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteMusicalGroup(
    @AuthUser() requester: Requester,
    @Param('id') id: string,
  ) {
    if (
      requester.role !== RequesterRole.MGROUP ||
      requester.id !== parseInt(id)
    ) {
      throw new ForbiddenException();
    }
    return this.musicalgroupService.deleteMusicalGroup(parseInt(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateMusicalGroup(
    @AuthUser() requester: Requester,
    @Param('id') id: string,
    @Body() musicalGroupDto: MusicalGroupDto,
  ) {
    if (
      requester.role !== RequesterRole.MGROUP ||
      requester.id !== parseInt(id)
    ) {
      throw new ForbiddenException();
    }
    musicalGroupDto.id = parseInt(id);
    return this.musicalgroupService.updateMusicalGroup(musicalGroupDto);
  }
}
