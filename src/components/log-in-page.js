import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import LogInForm from '../screens/log-in-form';
import { logInUser, createError } from '../redux/actions';
import cryptoJS from 'crypto-js';
import { Actions, Scene } from 'react-native-router-flux';

export class LogInPage extends Component {
  state = {
    login: '',
    password: ''
  }

  sendUserDetails = () => {
    const { login, password } = this.state;
    const cryptoPassword = cryptoJS.SHA256(password).toString();
    if (login.search(/.+@.+\.[a-z]{2,}/) !== -1) {
      this.props.logInUser(login.trim(), cryptoPassword);
      this.props.createError('');
    } else {
      this.props.createError('Please enter a valid email address');
    }
  }

  onInputLogin = (value) => {
    this.setState({ login: value });
  }

  onInputPassword = (value) => {
    this.setState({ password: value });
  }

  componentDidUpdate = () => {
    const { connectionState } = this.props;
    if (connectionState) {
      Actions.drawer({type: 'reset'});
    }
  }

  resetError = () => {
    this.props.createError('');
  }

  render() {
    const { error, loadingState } = this.props;
    return (
      <LogInForm
      loadingState={loadingState}
      logInUser={this.sendUserDetails}
      error={error}
      onInputLogin={this.onInputLogin}
      onInputPassword={this.onInputPassword}
      resetError={this.resetError}
      />
    )
  }
}

export default connect((state) => ({
  error: state.errors.error,
  loadingState: state.appStates.loadingState,
  connectionState: state.appStates.connectionState,
}), { logInUser, createError })(LogInPage);
