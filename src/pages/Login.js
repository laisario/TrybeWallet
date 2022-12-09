import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    senha: '',
  };

  hadleChangeInputEmail = ({ target }) => {
    this.setState({ email: target.value });
  };

  hadleChangeInputPassword = ({ target }) => {
    this.setState({ senha: target.value });
  };

  validateButon = () => {
    const { email, senha } = this.state;
    const minCharactersPassWord = 6;
    const verifyEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const verifyPassword = senha.length >= minCharactersPassWord;
    return verifyEmail && verifyPassword;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveUserEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="input-email">
            Email:
            <input
              id="input-email"
              type="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.hadleChangeInputEmail }
            />
          </label>
          <label htmlFor="input-senha">
            Senha:
            <input
              id="input-senha"
              type="password"
              data-testid="password-input"
              onChange={ this.hadleChangeInputPassword }
              value={ senha }
            />
          </label>
          <button
            type="submit"
            disabled={ !this.validateButon() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
