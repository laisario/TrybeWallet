import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteExpense, editExpense } from '../redux/actions/index';

class TableComponent extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="container-table">
        <TableContainer component={ Paper }>
          <Table
            sx={ { minWidth: 650 } }
            aria-label="simple table"
          >
            <TableRow>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Tag</TableCell>
              <TableCell align="center">Método de pagamento</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Moeda</TableCell>
              <TableCell align="center">Câmbio utilizado</TableCell>
              <TableCell align="center">Valor convertido</TableCell>
              <TableCell align="center">Moeda de conversão</TableCell>
              <TableCell align="center">Editar/Excluir</TableCell>
            </TableRow>
            <TableBody>
              {expenses.length
            && expenses.map((expense) => (
              <TableRow
                key={ expense.id }
                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
              >
                <TableCell component="th" scope="row">
                  {expense.description}
                </TableCell>
                <TableCell align="center">{expense.tag}</TableCell>
                <TableCell align="center">{expense.method}</TableCell>
                <TableCell align="center">{Number(expense.value).toFixed(2)}</TableCell>
                <TableCell align="center">
                  {expense.exchangeRates[expense.currency]?.name}
                </TableCell>
                <TableCell align="center">
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(expense.exchangeRates[expense.currency]?.ask)
                  }

                </TableCell>
                <TableCell align="center">
                  {
                    new Intl
                      .NumberFormat('en-US', { style: 'currency', currency: 'BRL' })
                      .format(Number(expense.value)
                      * Number(expense.exchangeRates[expense.currency]?.ask))
                  }

                </TableCell>
                <TableCell align="center">Real Brasileiro</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(expense)) }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => (dispatch(deleteExpense(expense))) }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

TableComponent.propTypes = {
  expenses: PropTypes.arrayOf('string').isRequired,
  dispatch: PropTypes.func.isRequired,
  // editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TableComponent);
