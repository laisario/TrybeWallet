import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, MenuItem, Button } from '@mui/material';
import { fetchEconomiaApi, fetchExchangeRate, saveEditedExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
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
      <div className="container-form">
        <form className="form">
          <TextField
            onChange={ this.handleValueOnChange }
            value={ value }
            name="value"
            data-testid="value-input"
            id="outlined-number"
            label="Valor"
            type="number"

          />
          <TextField
            type="text"
            onChange={ this.handleValueOnChange }
            value={ description }
            name="description"
            data-testid="description-input"
            id="outlined"
            label="Descrição"
          />
          <InputLabel id="demo-simple-select-label">Moeda: </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleValueOnChange }
            value={ currency }
          >
            <MenuItem value="">-</MenuItem>
            {currencies.map((moeda) => (
              <MenuItem
                key={ moeda }
                value={ moeda }
              >
                {moeda}

              </MenuItem>
            ))}
          </Select>
          <InputLabel id="demo-simple-selectmethod-label">
            Forma de pagamento:
          </InputLabel>
          <Select
            labelId="demo-simple-selectmethod-label"
            id="demo-simple-select"
            data-testid="method-input"
            onChange={ this.handleValueOnChange }
            value={ method }
            name="method"
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
            <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
          </Select>
          <InputLabel id="demo-simple-selecttag-label">
            Tag:
          </InputLabel>
          <Select
            labelId="demo-simple-selectmethod-label"
            id="demo-simple-select"
            data-testid="tag-input"
            onChange={ this.handleValueOnChange }
            name="tag"
            value={ tag }
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
          </Select>
          <Button
            onClick={ this.handleClick }
            type="button"
            data-testid="button"
            variant="contained"
            size="large"
            color="primary"
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </Button>
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
