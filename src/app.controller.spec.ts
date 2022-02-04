import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Utils } from './shared/utils/utils';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, Utils],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return error on generating bar code and reading expiry date', () => {
      const code = '83660000002-7 00700111000-1 00101020222-2 48159427500-2';

      const response = {
        barCode: 'Não foi possível obter o Código de Barras',
        amount: '200.70',
        expirationDate: 'Não foi possível obter a data de vencimento',
      };

      expect(appController.billInfo(code)).toStrictEqual(response);
    });

    it('should return exactly same data in "response" const', () => {
      const code = '21290.00119 21100.012109 04475.617405 9 75870000002000';

      const response = {
        barCode: '21299758700000020000001121100012100447561740',
        amount: '20.00',
        expirationDate: '16/7/2018',
      };

      expect(appController.billInfo(code)).toStrictEqual(response);
    });
  });
});
