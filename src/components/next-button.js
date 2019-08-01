import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colorTheme } from '../constants';

export default nextButton = ({ onPress, Icon }) => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  nextButton: {
    width: 50,
    height: 50,
    backgroundColor: colorTheme.middle,
    opacity: 0.7,
    borderRadius: 50,
    position: "absolute",
    right: 30,
    bottom: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})