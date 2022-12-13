import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { legacy_createStore as createStore, combineReducers } from 'redux';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import user from '../redux/reducers/user';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(combineReducers({ user }), initialState),
  } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
}
);

describe('Testa a página de Login', () => {
  test('A página deve renderizar dois inputs e um botão', () => {
    renderWithRedux(<Login />);
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
    const { store } = renderWithRedux(<Login />, { initialState });

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
