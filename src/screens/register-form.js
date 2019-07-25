import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { Input, Button } from 'react-native-elements';

const RegisterForm = ({ onChangeText, registerUser, loadingState, error }) => {
  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Input
          placeholder="FIRST NAME"
          onChangeText={(text) => { onChangeText(text, 'firstName') }}
        />
        <Input
          placeholder="LAST NAME"
          onChangeText={(text) => { onChangeText(text, 'lastName') }}
        />
        <Input
          placeholder='EMAIL'
          onChangeText={(text) => { onChangeText(text, 'email') }}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <Input
          placeholder='PASSWORD'
          secureTextEntry={true}
          onChangeText={(text) => { onChangeText(text, 'password') }}
        />
        <Input
          placeholder='CONFIRM PASSWORD'
          secureTextEntry={true}
          onChangeText={(text) => { onChangeText(text, 'confirmPassword') }}
          errorMessage={error}
        />
        <Button
          buttonStyle={styles.submitButton}
          title="SUBMIT"
          titleStyle={styles.submitButtonTitle}
          type="outline"
          loading={loadingState}
          // loadingStyle={}
          onPress={registerUser}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30
  },
  submitButton: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 150,
    borderColor: "#28a745",
  },
  submitButtonTitle: {
    color: "#28a745"
  }
})

export default RegisterForm;

