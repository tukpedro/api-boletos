import { BadRequestException, Injectable } from '@nestjs/common';
import { boleto } from 'boleto-brasileiro-validator';
import { Utils } from './shared/utils/utils';
@Injectable()
export class AppService {
  constructor(private readonly utils: Utils) {}


  billInfo(billCode: string) {

    this.utils.validate(billCode);

    const value = this.utils.getAmount(billCode)
    console.log(value);

    const expiry = this.utils.getExpiryDate(billCode);
    console.log(expiry)

    const barCode = this.utils.getBarCode(billCode);
    console.log(barCode)

    var blocos = [];

    blocos[0] = billCode.substring(0, 12);
    blocos[1] = billCode.substring(12, 12);
    blocos[2] = billCode.substring(24, 12);
    blocos[3] = billCode.substring(36, 12);

    /**
     * Verifica se é o modulo 10 ou modulo 11.
     * Se o 3º digito for 6 ou 7 é modulo 10, se for 8 ou 9, então modulo 11.
     */
    // var isModulo10 = ['6', '7'].indexOf(billCodeBarras[2]) != -1;
    // var valido = 0;

    // blocos.forEach(function (bloco, index) {
    //   if (isModulo10) {
    //     utils.modulo10(bloco, function (digitoVerificador) {
    //       if (digitoVerificador == bloco[bloco.length - 1]) valido++;
    //     });
    //   } else {
    //     utils.modulo11(bloco, function (digitoVerificador) {
    //       if (digitoVerificador == bloco[bloco.length - 1]) valido++;
    //     });
    //   }
    // });
  }
}
