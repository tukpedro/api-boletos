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

  validate(billCode: string): string {
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

  getAmount(billCode: string): number {
    billCode = billCode.replace(/[ .]/g, '');

    if (billCode.length === 47) {
      let index = billCode.substring(33, 47);
      let total = parseFloat(index.substring(4, 15)) / 100;

      return total;
    } else {
      let index: any = billCode.substring(4, 14);
      console.log(index + '     1');
      index = billCode.split('');
      console.log(index + '     2');
      index = index.splice(11, 1);
      console.log(index + '     3');
      index = index.join('');
      console.log(index + '     4');
      index = index.substring(4, 11)
      console.log(index + '     5');

      var blocks = [];

      blocks[0] = billCode.substring(0, 12);
      blocks[1] = billCode.substring(12, 12);
      blocks[2] = billCode.substring(24, 12);
      blocks[3] = billCode.substring(36, 12);
    }
  }

  getExpiryDate(billCode: string): Date {
    billCode = billCode.replace(/[ .]/g, '');

    let baseDate = new Date();

    let expiryDate = new Date();

    baseDate.setFullYear(1997, 9, 7);

    if (this.billType[0]) {
      let index5 = billCode.substring(33, 47);
      let expiryFactor = parseInt(index5.substring(0, 4));

      const timestamp = expiryDate.setTime(
        baseDate.getTime() + 1000 * 60 * 60 * 24 * expiryFactor,
      );
      const date = new Date(timestamp);

      return date;
    }

    if (this.billType[1]) {
      let expiryFactor = parseInt(billCode.substring(5, 9));

      const timestamp = expiryDate.setTime(
        baseDate.getTime() + 1000 * 60 * 60 * 24 * expiryFactor,
      );

      const date = new Date(timestamp);

      return date;
    }
  }

  getBarCode(billCode: any): string {
    billCode = billCode.replace(/[^0-9]/g, '');

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

  module10(billCode: any) {
    billCode = billCode.replace(/[^0-9]/g, '');

    let digito = 0;
    let soma = 0;
    let peso = 2;
    let totalDigitos = billCode.length - 1;

    for (let i = totalDigitos; i >= 0; i--) {
      let mult = billCode.substring(i, 1) * peso;
      if (mult >= 10) mult = 1 + (mult - 10);

      soma = soma + mult;
      peso = peso == 2 ? 1 : 2;
    }

    digito = 10 - (soma % 10);

    return digito != 10 ? digito : 0;
  }

  identificarReferencia = (billCode: string) => {
    billCode = billCode.replace(/[^0-9]/g, '');

    const referencia = billCode.substring(2, 1);

    switch (referencia) {
      case '6':
        return {
          mod: 10,
          efetivo: true,
        };
      case '7':
        return {
          mod: 10,
          efetivo: false,
        };
      case '8':
        return {
          mod: 11,
          efetivo: true,
        };
      case '9':
        return {
          mod: 11,
          efetivo: false,
        };
      default:
        break;
    }
  };
}
