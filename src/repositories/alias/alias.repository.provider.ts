import { Provider } from '@nestjs/common';
import { aliasRepositoryToken } from './alias.repository';
import { DataSource } from 'typeorm';
import { AliasEntity } from './alias.entity';
import { dataSourceProviderToken } from '../../config/database/database.provider';

export const aliasRepositoryProvider: Provider = {
  provide: aliasRepositoryToken,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(AliasEntity),
  inject: [dataSourceProviderToken],
};
