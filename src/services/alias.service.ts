import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AliasRepository } from '../repositories/alias/alias.repository';
import { ShortenDtoSchema } from '../controllers/schema/shorten.request.schema';

import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { AliasEntity } from '../repositories/alias/alias.entity';

@Injectable()
export class AliasService {
  constructor(private readonly aliasRepository: AliasRepository) {}

  async shorten(data: ShortenDtoSchema): Promise<AliasEntity> {
    if (!data) {
      throw new BadRequestException('No request data provided');
    }
    if (!data.url) {
      throw new BadRequestException('No url provided');
    }

    if (!data.alias) {
      data.alias = this.generateUniqueAlias();
      Logger.debug(data.alias);
      while (!!(await this.aliasRepository.findByAlias(data.alias))) {
        Logger.debug('Re-generate');
        data.alias = this.generateUniqueAlias();
      }
    } else {
      if (data.alias.length < 4 || !data.alias.match('[a-zA-Z0-9]*')) {
        throw new BadRequestException(
          'Specified alias must have only english letters and digits!',
        );
      }
      if (await this.aliasRepository.findByAlias(data.alias)) {
        throw new ConflictException('Specified alias already exists!');
      }
    }

    return await this.aliasRepository.upsertAlias({
      alias: data.alias,
      url: data.url,
      count: 0,
    });
  }

  async getUrlByAlias(alias: string): Promise<string> {
    const aliasDb = await this.aliasRepository.findByAlias(alias);
    if (aliasDb) {
      await this.aliasRepository.upsertAlias({
        ...aliasDb,
        count: aliasDb.count + 1,
      });
    }
    return aliasDb?.url;
  }

  async findAll(): Promise<AliasEntity[]> {
    return await this.aliasRepository.findAll();
  }

  private generateUniqueAliasV2() {
    return null;
  }

  private generateUniqueAlias() {
    const uuid = uuidv4().replace(/-/g, '');

    const hashedUUID = this.hashUUID(uuid);

    const reEncodedHash = this.reEncodeHash(hashedUUID);

    return this.getLastChars(reEncodedHash);
  }

  private hashUUID(uuid: string): string {
    return crypto.createHash('sha256').update(uuid).digest('hex');
  }

  private reEncodeHash(hash: string): string {
    return BigInt(`0x${hash}`).toString(36);
  }

  private getLastChars(str: string): string {
    const last = str.slice(-6);
    const chars = last.padStart(6, '0');
    Logger.debug(`Lash chars: ${chars}`);
    return chars;
  }
}
