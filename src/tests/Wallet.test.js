import wallet from '../redux/reducers/wallet';
import { saveCurrencies } from '../redux/actions/index';
import mockData from './helpers/mockData';

describe('Testa o reducer Wallet', () => {
  test('Testa os cases do reduce', () => {
    const initialState = {
      wallet: {
        currencies: ['USD'],
        expenses: [
          {
            id: 1,
            value: '10',
            description: 'bala',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: mockData,
          }],
        editor: false,
        idToEdit: 0,
      },
    };
    expect(wallet(initialState, saveCurrencies(['USD']))).toStrictEqual({ ...initialState, currencies: ['USD'] });
  });
});
