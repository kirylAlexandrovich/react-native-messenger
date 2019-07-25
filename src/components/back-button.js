import React, { Component } from 'react';
import { Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Header, Avatar, Button, TouchableOpacity } from 'react-native-elements';

class BackButton extends Component {
  render() {
    const { roomName, onBack } = this.props;
    if (roomName) {
      return (
        <Button
            onPress={onBack}
            type="clear"
            icon={<Image source={require('../images/icons/twotone_keyboard_backspace_white_36dp.png')} />}
          />
      )
    }
    return <Text></Text>;
  }
}

export default BackButton;
