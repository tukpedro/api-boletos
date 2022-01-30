import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Utils } from './shared/utils/utils';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Utils],
})
export class AppModule {}
