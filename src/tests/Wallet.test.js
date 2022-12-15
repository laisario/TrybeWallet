import wallet from '../redux/reducers/wallet';
import {
  saveCurrencies,
  saveMyExpenses,
  deleteExpense,
  editExpense,
  saveEditedExpense,
} from '../redux/actions/index';
import mockData from './helpers/mockData';

const state = {
  currencies: ['USD'],
  expenses: [
    {
      id: 0,
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

const state3 = {
  currencies: ['USD'],
  expenses: [
    {
      id: 0,
      value: '10',
      description: 'bala',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: mockData,
    },
    {
      id: 1,
      value: '20',
      description: 'ASIUDAGUSA',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Saúde',
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

describe('Testa o reducer Wallet', () => {
  test('Testa os cases do reduce', () => {
    expect(wallet(state, saveCurrencies(['USD']))).toStrictEqual({ ...state, currencies: ['USD'] });
    expect(wallet(state, saveMyExpenses(newExpense, mockData)))
      .toStrictEqual({ ...state,
        expenses: [...state.expenses, {
          ...newExpense,
          id: 1,
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
    expect(wallet(state, editExpense(state.expenses[0])))
      .toStrictEqual({ ...state, editor: true, idToEdit: 0 });
  });

  test('Testa case saveEditedExpense', () => {
    expect(wallet({ ...state3, editor: true }, saveEditedExpense({ ...state3.expenses[0], value: '2' })))
      .toStrictEqual({ ...state3,
        editor: false,
        expenses: state3.expenses
          .map((expense) => (state3.idToEdit === expense.id
            ? { ...expense, value: '2' } : expense)) });
  });
});
