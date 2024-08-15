import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const dataSourceProviderToken = Symbol('DATA_SOURCE');

export const databaseProviders: Provider[] = [
  {
    provide: dataSourceProviderToken,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: true,
        entities: ['**/*.entity.js'],
      });

      return dataSource.initialize();
    },
  },
];
