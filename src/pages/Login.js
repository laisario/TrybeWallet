import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { saveUserEmail } from '../redux/actions';
import Logo from '../assets/logoTrybeWallet.svg';

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
    history.push('/TrybeWallet/carteira');
  };

  render() {
    const { email, senha } = this.state;
    return (
      <div className="container-form-login">
        <div className="container-form-login-2">
          <img src={ Logo } alt="Logo TrybeWallet" className="img-form-login" />
          <form onSubmit={ this.handleSubmit } className="form-login">
            <TextField
              required
              id="outlined-normal"
              label="Email"
              data-testid="email-input"
              value={ email }
              onChange={ this.hadleChangeInputEmail }
            />
            <TextField
              data-testid="password-input"
              onChange={ this.hadleChangeInputPassword }
              value={ senha }
              id="outlined-password-input"
              label="Password"
              type="password"
              style={ { marginTop: 10, marginBottom: 10 } }
              autoComplete="current-password"
            />
            <Button
              disabled={ !this.validateButon() }
              variant="contained"
              size="large"
              color="success"
              onClick={ this.handleSubmit }
            >
              Entrar
            </Button>
          </form>
        </div>
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
