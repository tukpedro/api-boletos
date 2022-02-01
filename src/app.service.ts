import { Injectable } from '@nestjs/common';
import { Utils } from './shared/utils/utils';
@Injectable()
export class AppService {
  constructor(private readonly utils: Utils) {}

  billInfo(billCode: string) {
    billCode = billCode.replace(/[ -.]/g, '');

    let payload: { barCode: string; amount: string; expirationDate: string } = {
      barCode: '',
      amount: '',
      expirationDate: '',
    };

    this.utils.verifyCode(billCode);

    this.utils.validateDV(billCode);
    
    const barCode = this.utils.getBarCode(billCode);
    payload.barCode = barCode;
    
    const amount = this.utils.getAmount(billCode);
    payload.amount = String(amount.toFixed(2));
    
    const expiry = this.utils
      .getExpiryDate(billCode)
      .toLocaleString('pt-BR', { timeZone: 'UTC' });
    
    if (expiry[0] === 'N') payload.expirationDate = expiry;
    
    else payload.expirationDate = expiry.substring(0, 10);

    return payload;
  }
}
