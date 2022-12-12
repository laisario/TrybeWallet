import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.length
            && expenses.map((expense) => (
              <tbody key={ expense.id }>
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency]?.name}</td>
                  <td>
                    {`R$: ${Number(expense.exchangeRates[expense.currency]?.ask)
                      .toFixed(2)}`}
                  </td>
                  <td>
                    {`R$: ${
                      new Intl
                        .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                        .format(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency]?.ask))}`}
                  </td>
                  <td>Real Brasileiro</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf('string').isRequired,
};

export default connect(mapStateToProps)(Table);
