import { Injectable } from '@nestjs/common';
import { Utils } from './shared/utils/utils';
@Injectable()
export class AppService {
  constructor(private readonly utils: Utils) {}

  billInfo(billCode: string) {
    billCode = billCode.replace(/[ -.]/g, '');

    // const validate = this.utils.validate(billCode);
    // console.log(validate);

    // const clean = this.utils.removeDV(billCode);
    // console.log(clean);

    // let t = '34191.75637 13969.782526 50451.630003 1 000'.replace(/[ -.]/g, '');

    // console.log(billCode);
    // console.log(t);
    // console.log(t.length);

    // const m = this.utils.module10(t);
    // console.log(m)

    // console.log(billCode);
    // console.log(billCode.length);

    const value = this.utils.getAmount(billCode);
    console.log(value);

    const expiry = this.utils.getExpiryDate(billCode);
    // console.log(expiry);

    
    // const barCode = this.utils.getBarCode(billCode);
    // console.log(barCode);
  }
}
