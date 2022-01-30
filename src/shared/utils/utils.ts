import { BadRequestException } from '@nestjs/common';
export class Utils {
  validate(billCode: string): void {
    if (isNaN(Number(billCode))) {
      throw new BadRequestException('Linha digitável inválida');
    }

    if (billCode.length != 47 && billCode.length != 48) {
      throw new BadRequestException('Linha digitável inválida');
    }
    // let info;

    // if (billCode.length == 48) {
    //   info = boletoConcessionaria.validarLinhaDigitavel(billCode);
    // } else if (billCode.length == 47) {
    //   info = boletoBancario.validarLinhaDigitavel(billCode);
    // }

    // return info;
  }

  getAmount(billCode: string): number {
    let index5 = billCode.substring(33, 47);
    let total = parseFloat(index5.substring(4, 15)) / 100;

    return total;
  }

  getExpiryDate(billCode: string): Date {
    let index5 = billCode.substring(33, 47);
    let expiryFactor = parseInt(index5.substring(0, 4));

    let baseDate = new Date();
    let expiryDate = new Date();

    baseDate.setFullYear(1997, 9, 7);

    const timestamp = expiryDate.setTime(
      baseDate.getTime() + 1000 * 60 * 60 * 24 * expiryFactor,
    );
    const date = new Date(timestamp);

    return date;
  }

  somarDigitos(numero: number): number {
    let soma = 0;
    while (numero != 0) {
      soma += numero % 10;
      numero = Math.trunc(numero / 10);
      console.log(numero);
    }
    return soma;
  }

  getBarCode(billCode: any) {
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

  modulo10(billCode: string) {
    billCode = billCode.replace(/[^0-9]/g, '');

    let digito = 0;
    let soma = 0;
    let peso = 2;
    let totalDigitos = billCode.length - 1;
    const billNum = parseInt(billCode);

    // for (let i = totalDigitos; i >= 0; i--) {
    //     let mult = (billCode.substring(i, 1) * peso );
    //     if (mult >= 10)
    //         mult = 1 + (mult - 10);

    //     soma = soma + mult;
    //     peso = (peso == 2) ? 1 : 2;
    // }

    // digito = 10 - (soma % 10);

    return digito != 10 ? digito : 0;
  }

  modulo11(bloco: Array<number>, callback: Function) {
    const tamanhoBloco = bloco.length - 1;

    let codigo = bloco.slice(0, tamanhoBloco);
    console.log(codigo);

    codigo = codigo.reverse();
    console.log(codigo);

    //   var somatorio = 0;

    //   codigo.forEach(function (value, index) {
    //     somatorio += value * (2 + (index >= 8 ? index - 8 : index));

    //     if (codigo.length == index + 1) {
    //       var restoDivisao = somatorio % 11;

    //       if (restoDivisao == 0 || restoDivisao == 1) {
    //         dezenaSuperiorSomatorioMenosSomatorio = 0;
    //       } else if (restoDivisao == 10) {
    //         dezenaSuperiorSomatorioMenosSomatorio = 1;
    //       } else {
    //         dezenaSuperiorSomatorioMenosSomatorio =
    //           Math.ceil(somatorio / 11) * 11 - somatorio;
    //       }

    //       callback(dezenaSuperiorSomatorioMenosSomatorio);
    //     }
    //   });
  }
}
