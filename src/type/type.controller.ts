import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { TypeDto } from '../type/type.dto';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async getTypes() {
    return await this.typeService.getTypes();
  }

  @Get(':name')
  async getType(@Param('name') name: string) {
    const result = await this.typeService.getType(name);
    return result[0];
  }

  @Post('/create')
  async createType(@Body() typeDto: TypeDto) {
    return this.typeService.createType(typeDto);
  }

  @Delete(':name')
  async deleteType(@Param('name') id: string) {
    return this.typeService.deleteType(name);
  }

  @Put(':name')
  async updateType(@Param('name') name: string, @Body() typeDto: TypeDto) {
    typeDto.name = name;
    return this.typeService.updateType(typeDto);
  }
}
