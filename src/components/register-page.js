import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterForm from '../screens/register-form';
import { sendUserDetails, createError, changeLoadingState } from '../redux/actions';
import cryptoJS from 'crypto-js';

export class registerPage extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  onChangeText = (text, target) => {
    this.setState({ [target]: text });
  }

  submitUserDetails = () => {
    const { email, password, firstName, lastName, confirmPassword } = this.state;
    const { newError } = this.props;

    if (!password|| !firstName || !lastName) {
      newError('Please, fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      newError('Password does not match');
      return;
    }

    if (email.search(/.+@.+\.[a-z]{2,}/) === -1) {
      newError('Please enter a valid email address');
      return;
    }
    console.log('user registred');
    const cryptoPassword = cryptoJS.SHA256(password).toString();
    const userDetails = {
      email, firstName, lastName, cryptoPassword,
    };
    this.props.changeLoadingState(true);
    this.props.sendUserDetails(userDetails);
  }

  render() {
    const { error, loadingState } = this.props;
    return (
      <RegisterForm onChangeText={this.onChangeText} registerUser={this.submitUserDetails} loadingState={loadingState} error={error} />
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.errors.error,
  loadingState: state.appStates.loadingState,
})

const mapDispatchToProps = {
  sendUserDetails,
  changeLoadingState,
  newError: createError,

}

export default connect(mapStateToProps, mapDispatchToProps)(registerPage)

