import { fetchEconomiaApi } from '../redux/actions';
import mockData from './helpers/mockData';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa as funções thunks', () => {
  it('asdasda', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const { store } = renderWithRedux();
    await store.dispatch(fetchEconomiaApi());
    expect(store.getState().wallet.currencies).toStrictEqual([
      'USD', 'CAD', 'EUR',
      'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS',
      'ETH', 'XRP', 'DOGE',
    ]);
  });
});
