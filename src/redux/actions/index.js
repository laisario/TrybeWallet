export const SAVE_EMAIL = 'SAVE_EMAIL';

export function saveUserEmail(email) {
  return {
    type: SAVE_EMAIL,
    payload: email,
  };
}
