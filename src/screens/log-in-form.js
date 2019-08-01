import React from 'react';
import {
  StyleSheet,
  View, Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button } from 'react-native-elements';
import { resetError } from '../actions';
import { buttonsColor } from '../constants';

const LogInForm = ({ onInputLogin, onInputPassword, loadingState, logInUser, error }) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputsContainer}>
        <Input
          placeholder='EMAIL'
          leftIcon={
            <Image
              source={require('../images/icons/twotone_email_black_24dp.png')}
            />
          }
          onChangeText={onInputLogin}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <Input
          placeholder='PASSWORD'
          secureTextEntry={true}
          leftIcon={
            <Image
              source={require('../images/icons/twotone_vpn_key_black_24dp.png')}
            />
          }
          onChangeText={onInputPassword}
          errorMessage={error}
        />
      </View>
      <Button
        buttonStyle={styles.submitButton}
        title="SUBMIT"
        titleStyle={styles.submitButtonTitle}
        type="outline"
        loading={loadingState}
        loadingProps={{ color: {buttonsColor} }}
        onPress={logInUser}
      />
      <Button
        buttonStyle={styles.submitButton}
        title="Register"
        titleStyle={styles.submitButtonTitle}
        type="clear"
        onPress={() => { Actions.register(); resetError() }}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30
  },
  submitButton: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 150,
    borderColor: buttonsColor,
  },
  submitButtonTitle: {
    color: buttonsColor
  },
  inputsContainer: {
    height: 130,
  }
})

export default LogInForm;