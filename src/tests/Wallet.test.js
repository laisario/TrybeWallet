import wallet from '../redux/reducers/wallet';
import { saveCurrencies, saveMyExpenses, deleteExpense } from '../redux/actions/index';
import mockData from './helpers/mockData';

describe('Testa o reducer Wallet', () => {
  test('Testa os cases do reduce', () => {
    const state = {
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
    };
    const newExpense = {
      value: '15',
      description: 'maça',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    const state2 = { expenses: [] };

    expect(wallet(state, saveCurrencies(['USD']))).toStrictEqual({ ...state, currencies: ['USD'] });
    expect(wallet(state, saveMyExpenses(newExpense, mockData)))
      .toStrictEqual({ ...state,
        expenses: [...state.expenses, {
          ...newExpense,
          id: 2,
          exchangeRates: mockData,
        }] });
    expect(wallet(state2, saveMyExpenses(newExpense, mockData)))
      .toStrictEqual({ ...state2,
        expenses: [...state2.expenses, {
          ...newExpense,
          id: 0,
          exchangeRates: mockData,
        }] });
    expect(wallet(state, deleteExpense(state.expenses[0])))
      .toStrictEqual({ ...state, expenses: [] });
  });
});
