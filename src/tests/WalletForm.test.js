import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testa o componente WalletForm', () => {
  test('Testa se renderiza o formulário', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const coinInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });

    const paymentInput = screen.getByTestId('method-input');

    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(paymentInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('Testa se as informções do formulário estão no estado global', () => {
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
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const button = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const coinInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });

    const paymentInput = screen.getByTestId('method-input');

    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'bala');
    userEvent.selectOptions(coinInput, ['USD']);
    userEvent.selectOptions(paymentInput, ['Dinheiro']);
    userEvent.selectOptions(tagInput, ['Alimentação']);
    userEvent.click(button);

    expect(store.getState().wallet.expenses.length).toBe(1);
  });
});
