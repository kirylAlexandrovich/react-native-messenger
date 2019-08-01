import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colorTheme, green } from '../constants';

export default class App extends PureComponent {
  render() {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size={50} color={green} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorTheme.lite,
  }
})
