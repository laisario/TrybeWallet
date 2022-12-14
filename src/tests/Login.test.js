import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import rootReducer from '../redux/reducers/index';
import App from '../App';

describe('Testa a página de Login', () => {
  test('A página deve renderizar dois inputs e um botão', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa se o email do user fica salvo no estado global', () => {
    const testEmail = 'alguem@alguem.com';
    const testPassword = 'a1bcde';

    const initialState = {
      user: {
        email: testEmail,
      },
    };

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'], initialState });

    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const inputPassword = screen.getByLabelText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPassword, testPassword);
    userEvent.click(button);
    expect(store.getState().user.email).toBe(testEmail);
  });
});
// 1. Acessar
// 2. Agir / Interagir
// 3. Aferir
