export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_EXCHANGE = 'EXCHANGE_RATES';

export function saveUserEmail(email) {
  return {
    type: SAVE_EMAIL,
    payload: email,
  };
}

export function saveCurrencies(currencies) {
  return {
    type: SAVE_CURRENCIES,
    payload: currencies,
  };
}

export function saveMyExpenses(expense, prices) {
  return {
    type: SAVE_EXPENSES,
    payload: expense,
    prices,
  };
}

export function fetchEconomiaApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currenciesArray = Object.keys(data);
    const indexUSDT = currenciesArray.indexOf('USDT');
    currenciesArray.splice(indexUSDT, 1);
    dispatch(saveCurrencies(currenciesArray));
  };
}

export function fetchExchangeRate(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(saveMyExpenses(expense, data));
  };
}
