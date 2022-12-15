import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEconomiaApi, fetchExchangeRate, saveEditedExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEconomiaApi());
  }

  componentDidUpdate(prevProps) {
    const { idToEdit: prevIdToEdit, editor: prevEditor } = prevProps;
    const { idToEdit, editor, expenses } = this.props;

    if (idToEdit !== prevIdToEdit || editor !== prevEditor) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      if (expenseToEdit) {
        this.setState({
          value: expenseToEdit.value,
          description: expenseToEdit.description,
          currency: expenseToEdit.currency,
          method: expenseToEdit.method,
          tag: expenseToEdit.tag });
      }
    }
  }

  handleValueOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch, editor } = this.props;
    dispatch(editor ? saveEditedExpense(this.state) : fetchExchangeRate(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, tag, currency, method } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="text"
              data-testid="value-input"
              name="value"
              onChange={ this.handleValueOnChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleValueOnChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleValueOnChange }
              value={ currency }
            >
              {/* <option value="">Selecione a moeda</option> */}
              {currencies.map((moeda) => (
                <option
                  key={ moeda }
                  value={ moeda }
                >
                  {moeda}
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              data-testid="method-input"
              onChange={ this.handleValueOnChange }
              name="method"
              value={ method }
            >
              Método de pagamento:
              {/* <option value="">-</option> */}
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleValueOnChange }
              name="tag"
              value={ tag }
            >
              Tag:
              {/* <option value="">-</option> */}
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={ this.handleClick }
            type="button"
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
