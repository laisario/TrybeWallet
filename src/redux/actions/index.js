export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

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
