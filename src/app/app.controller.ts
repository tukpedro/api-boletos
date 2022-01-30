import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('boleto')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':billCode')
  getBoleto(@Param('billCode') billCode: string) {
    return this.appService.billInfo(billCode);
  }
}
