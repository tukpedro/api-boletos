import { BadRequestException } from '@nestjs/common';
import { MessagesError } from '../errors/message-errors';
export class Utils {
  constructor(
    private readonly billType: string[],
    private readonly error: MessagesError,
  ) {
    this.error = new MessagesError();

    this.billType = ['Linha Digitável Título', 'Linha Digitável Convênio'];
  }

  verifyCode(billCode: string): string {
    billCode = billCode.replace(/[ -.]/g, '');

    if (isNaN(Number(billCode))) {
      throw new BadRequestException(
        'Linha digitável inválida',
        this.error.NUMBER_ONLY,
      );
    }

    if (billCode.length != 47 && billCode.length != 48) {
      throw new BadRequestException(
        'Linha digitável inválida',
        this.error.INVALID_LENGTH,
      );
    }

    if (billCode.length === 47) {
      return this.billType[0];
    }

    if (billCode.length === 48 && billCode[0] === '8') {
      return this.billType[1];
    }

    throw new BadRequestException(
      'Linha digitável inválida',
      this.error.INVALID_FIRST_CHAR,
    );
  }

  validateDV(billCode: string) {
    billCode = billCode.replace(/[ -.]/g, '');

    if (billCode.length === 47) {
      let blocks = [];

      blocks[0] = billCode.substring(0, 9);
      blocks[1] = billCode.substring(10, 20);
      blocks[2] = billCode.substring(21, 31);

      if (Number(billCode[3]) === 9) {
        let dv1 = this.modulo10(blocks[0]) === Number(billCode[9]);
        let dv2 = this.modulo10(blocks[1]) === Number(billCode[20]);
        let dv3 = this.modulo10(blocks[2]) === Number(billCode[31]);

        if (dv1 === false || dv2 === false || dv3 === false)
          throw new BadRequestException(
            'Linha digitável inválida',
            this.error.INVALID_DV,
          );
      }
    }

    if (billCode.length === 48) {
      let blocks = [];

      blocks[0] = billCode.substring(0, 11);
      blocks[1] = billCode.substring(12, 23);
      blocks[2] = billCode.substring(24, 35);
      blocks[3] = billCode.substring(36, 47);

      if (Number(billCode[2]) >= 8) {
        let dv1 = this.modulo11(blocks[0]) === Number(billCode[11]);
        let dv2 = this.modulo11(blocks[1]) === Number(billCode[23]);
        let dv3 = this.modulo11(blocks[2]) === Number(billCode[35]);
        let dv4 = this.modulo11(blocks[3]) === Number(billCode[47]);

        if (dv1 === false || dv2 === false || dv3 === false || dv4 === false)
          throw new BadRequestException(
            'Linha digitável inválida',
            this.error.INVALID_DV,
          );
      }

      if (Number(billCode[2]) < 8) {
        let dv1 = this.modulo10(blocks[0]) === Number(billCode[11]);
        let dv2 = this.modulo10(blocks[1]) === Number(billCode[23]);
        let dv3 = this.modulo10(blocks[2]) === Number(billCode[35]);
        let dv4 = this.modulo10(blocks[3]) === Number(billCode[47]);

        if (dv1 === false || dv2 === false || dv3 === false || dv4 === false)
          throw new BadRequestException(
            'Linha digitável inválida',
            this.error.INVALID_DV,
          );
      }
    }

    return true;
  }

  getAmount(billCode: string): number {
    billCode = billCode.replace(/[ .]/g, '');

    if (billCode.length === 47) {
      let index = billCode.substring(33, 47);
      let total = parseFloat(index.substring(4, 15)) / 100;

      return total;
    } else {
      let blockWithoutDV = this.removeDV(billCode);
      let total = Number(blockWithoutDV.substring(4, 15)) / 100;

      return total;
    }
  }

  getExpiryDate(billCode: string): any {
    billCode = billCode.replace(/[ .]/g, '');

    let baseDate = new Date();

    let expiryDate = new Date();

    baseDate.setFullYear(1997, 9, 7);

    if (billCode.length === 47) {
      let index5 = billCode.substring(33, 47);
      let expiryFactor = parseInt(index5.substring(0, 4));

      const timestamp = expiryDate.setTime(
        baseDate.getTime() + 1000 * 60 * 60 * 24 * expiryFactor,
      );
      const date = new Date(timestamp);

      return date;
    }

    // if (billCode.length === 48 && Number(billCode[20]) === 2) {
    //   let clearCode = this.removeDV(billCode);

    //   let expiration = clearCode.substring(19, 27);

    //   let day = Number(expiration.substring(6, 8));
    //   let month = Number(expiration.substring(4, 6));
    //   let year = Number(expiration.substring(0, 4));

    //   const date = new Date(year, month - 1, day);

    //   return date;
    // }

    if (billCode.length === 48) {
      billCode = (this.removeDV(billCode)).substring();
      console.log(billCode.length);
    }

    return this.error.DATE;
  }

  toLineCode(billCode: string) {
    billCode = this.removeDV(billCode.replace(/[ .]/g, ''));
    console.log(billCode.length);

    const reference = billCode.substring(2, 1);
    console.log(reference);

    let block1 =
      billCode.substring(0, 4) +
      billCode.substring(19, 20) +
      '.' +
      billCode.substring(20, 24);
    let block2 = billCode.substring(24, 29) + billCode.substring(29, 34);
    let block3 = billCode.substring(34, 39) + billCode.substring(39, 44);
    let block4 = billCode.substring(4, 5);
    let block5 = billCode.substring(5, 19);

    if (
      this.modulo11(billCode.substring(0, 4) + billCode.substring(5, 44)) !=
      Number(block4)
    )
      return 'ERROOOOO'; //'Digito verificador '+campo4+', o correto é '+modulo11_banco(  billCode.substr(0,4)+linha.substr(5,99)  )+'\nO sistema não altera automaticamente o dígito correto na quinta casa!'

    let lineCode =
      block1 +
      this.modulo10(block1) +
      ' ' +
      block2 +
      this.modulo10(block2) +
      ' ' +
      block3 +
      this.modulo10(block3) +
      ' ' +
      block4 +
      block5;
    
    return lineCode;
  }

  getBarCode(billCode: any): string {
    billCode = billCode.replace(/[^0-9]/g, '');

    if (billCode.length != 47) {
      return this.error.BAR_CODE;
    }

    let barCode = '';

    barCode =
      billCode.substr(0, 4) +
      billCode.substr(32, 1) +
      billCode.substr(33, 14) +
      billCode.substr(4, 5) +
      billCode.substr(10, 10) +
      billCode.substr(21, 10);

    return barCode;
  }

  modulo10(block: string) {
    const code = block.split('').reverse();
    const summation = code.reduce((acc, current, index) => {
      let sum = Number(current) * (((index + 1) % 2) + 1);
      sum = sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum;
      return acc + sum;
    }, 0);
    return Math.ceil(summation / 10) * 10 - summation;
  }

  modulo11(block: string) {
    const code = block.split('').reverse();
    let multiplier = 2;
    const summation = code.reduce((acc, current) => {
      const sum = Number(current) * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
      return acc + sum;
    }, 0);
    const remainder = summation % 11;

    if (remainder === 0 || remainder === 1) {
      return 0;
    }
    if (remainder === 10) {
      return 1;
    }
    const DV = 11 - remainder;
    return DV;
  }

  removeDV(billCode: string) {
    billCode = billCode.replace(/[^0-9]/g, '');

    billCode =
      billCode.substring(0, 11) +
      billCode.substring(12, 23) +
      billCode.substring(24, 35) +
      billCode.substring(36, 47);

    return billCode;
  }
}
