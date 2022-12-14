import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testa o Header', () => {
  test('Testa se renderiza o header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const emailUser = screen.getAllByRole('heading', {
      level: 3,
    })[0];
    const exchange = screen.getAllByRole('heading', {
      level: 3,
    })[2];
    const sum = screen.getAllByRole('heading', {
      level: 3,
    })[1];

    expect(emailUser).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(sum).toBeInTheDocument();
  });
  test('Testa se a soma das despesas está correto', () => {
    const testEmail = 'alguem@alguem.com';

    const initialState = {
      user: {
        email: testEmail,
      },
      wallet: {
        currencies: [],
        expenses: [
          {
            id: 0,
            value: '5',
            description: 'Bala',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '10',
            description: 'kgk',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Saúde',
            exchangeRates: mockData,
          },
        ],
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const sum = screen.getAllByRole('heading', {
      level: 3,
    })[1];
    expect(sum).toHaveTextContent('71.30');
  });
});
