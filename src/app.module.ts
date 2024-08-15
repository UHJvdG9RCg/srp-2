import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from './config/database/database.module';
import { AliasService } from './services/alias.service';
import { aliasRepositoryProvider } from './repositories/alias/alias.repository.provider';
import { AliasRepository } from './repositories/alias/alias.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AliasService, AliasRepository, aliasRepositoryProvider],
})
export class AppModule {}
