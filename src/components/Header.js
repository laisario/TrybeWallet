import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../assets/logoTrybeWallet.svg';
import '../App.css';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const sum = expenses
      .reduce((acc, currValue) => (acc + Number(currValue.value)
      * Number(currValue.exchangeRates[currValue.currency]?.ask)), 0).toFixed(2);
    return (
      <div className="container-header">
        <img src={ Logo } alt="Logo TrybeWallet" className="img-header" />
        <div className="container-email">
          <PersonIcon id="icon" color="primary" />
          <h3 data-testid="email-field" id="email-field">{ userEmail }</h3>
        </div>
        <div className="container-money">
          <h3 data-testid="total-field">{`Total despesas: ${sum}`}</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf('string').isRequired,
};
// {
//   value: PropTypes.string.isRequired,
//   currency: PropTypes.string.isRequired,
//   reduce: PropTypes.func.isRequired,
// }
export default connect(mapStateToProps)(Header);
