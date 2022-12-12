import { SAVE_CURRENCIES, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses:
        [...state.expenses,
          { id: state.expenses.length
            ? state.expenses[state.expenses.length - 1].id + 1
            : 0,
          ...action.payload,
          exchangeRates: action.prices,
          },
        ],
    };
  default:
    return state;
  }
};

export default wallet;
