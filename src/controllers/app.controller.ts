import {
  Body,
  Controller,
  Get,
  HttpRedirectResponse,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { AliasService } from '../services/alias.service';
import { ShortenDtoSchema } from './schema/shorten.request.schema';
import { AliasEntity } from '../repositories/alias/alias.entity';

@Controller()
export class AppController {
  constructor(private readonly aliasService: AliasService) {}

  @Get('/stats')
  async getStats(): Promise<AliasEntity[]> {
    return await this.aliasService.findAll();
  }

  @Post('/shorten')
  async shorten(@Body() data: ShortenDtoSchema): Promise<AliasEntity> {
    return await this.aliasService.shorten(data);
  }

  @Get(':alias')
  @Redirect()
  async redirectAlias(
    @Param('alias') alias: string,
  ): Promise<HttpRedirectResponse> {
    const url = await this.aliasService.getUrlByAlias(alias);

    if (url) {
      return { url, statusCode: HttpStatus.FOUND };
    } else {
      throw new NotFoundException();
    }
  }
}
