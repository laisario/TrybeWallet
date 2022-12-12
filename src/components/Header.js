import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    console.log(expenses);
    const sum = expenses
      .reduce((acc, currValue) => (acc + Number(currValue.value)
      * Number(currValue.exchangeRates[currValue.currency]?.ask)), 0).toFixed(2);
    return (
      <div>
        <h3 data-testid="email-field">{ userEmail }</h3>
        <h3 data-testid="total-field">{ sum }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
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
