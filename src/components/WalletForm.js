import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.fetchEconomiaApi();
  }

  fetchEconomiaApi = async () => {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currenciesArray = Object.keys(data);
    const indexUSDT = currenciesArray.indexOf('USDT');
    currenciesArray.splice(indexUSDT, 1);
    dispatch(saveCurrencies(currenciesArray));
  };

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="text"
              data-testid="value-input"
              // value={ }
              // onChange={  }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="description-input"
              // value={ }
              // onChange={  }
            />
          </label>
          <select data-testid="currency-input">
            {currencies.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
              >
                {moeda}
              </option>))}
          </select>
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
