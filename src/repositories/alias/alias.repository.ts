import { Repository } from 'typeorm';
import { AliasEntity } from './alias.entity';
import { Inject, Injectable } from '@nestjs/common';

export const aliasRepositoryToken = Symbol('aliasRepositoryToken');

@Injectable()
export class AliasRepository {
  constructor(
    @Inject(aliasRepositoryToken)
    private readonly repository: Repository<AliasEntity>,
  ) {}

  async upsertAlias(entity: AliasEntity) {
    return await this.repository.save(entity);
  }

  async findAll(): Promise<AliasEntity[]> {
    return await this.repository.find();
  }

  async findByAlias(alias: string): Promise<AliasEntity> {
    return await this.repository.findOneBy({ alias });
  }
}
