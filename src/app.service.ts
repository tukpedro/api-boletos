import { Injectable } from '@nestjs/common';
import { Utils } from './shared/utils/utils';
@Injectable()
export class AppService {
  constructor(private readonly utils: Utils) {}

  billInfo(billCode: string) {
    billCode = billCode.replace(/[ -.]/g, '');

    this.utils.verifyCode(billCode);

    this.utils.validateDV(billCode);

    return {
      barCode: this.utils.getBarCode(billCode),
      amount: String(this.utils.getAmount(billCode).toFixed(2)),
      expirationDate: this.utils.getExpiryDate(billCode)
    };
  }
}
